<?php

namespace App\Controller;

use App\Entity\Technologies;
use App\Form\TechnologieType;
use App\Entity\Projects;
use App\Entity\Image;
use App\Form\ProjectType;
use App\Form\EditProjectType;
use App\Service\FileUploader;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\File\File;
use Cocur\Slugify\Slugify;



use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectsController extends Controller
{
    /**
     * @Route("/projets", name="projets")
     */
    public function projets()
    {
        // replace this line with your own code!
        $em = $this->getDoctrine()->getManager();
        $projects = $em->getRepository(Projects::class)->findAll();
        return $this->render('base/projets.html.twig', array('projects' => $projects));
    }

    /**
     * @Route("/gestion-projects", name="gestion_projects")
     */
    public function gestion_projets()
    {
        // replace this line with your own code!
        $em = $this->getDoctrine()->getManager();
        $projects = $em->getRepository(Projects::class)->findAll();
        return $this->render('base/projets_gestion.html.twig', array('projects' => $projects));
    }



    /**
     * @Route("/projets/{slug}-{id}", name="project_id", requirements={"slug" : "[a-z0-9\-]*"})
     */
    public function projet_id($slug, $id)
    {
        // replace this line with your own code!
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->find($id);
        $next = $em->getRepository(Projects::class)->findOneByNext($project->getDate());
        $previous = $em->getRepository(Projects::class)->findOneByPrevious($project->getDate());
        $slug = new Slugify();
        if ($next != null) {
            $next["title"] = $slug->slugify($next["title"]);
        }
        if ($previous != null) {
            $previous["title"] = $slug->slugify($previous["title"]);
        }
        return $this->render(
            'base/projet_id.html.twig',
            [
                'project' => $project,
                'next'    => $next,
                'previous' => $previous,

            ]
        );
    }

    /**
     * @Route("/new-project", name="new_project")
     */
    public function new_project(Request $request, FileUploader $fileUploader)
    {
        $project = new Projects();
        $form = $this->createForm(ProjectType::class, $project);
        // 2) handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($project);
            $em->flush();
            return $this->redirectToRoute('project_id', ['slug' => $project->getSlug(), 'id' => $project->getId()]);
        }
        // replace this line with your own code!
        // return $this->redirectToRoute('projets');
        return $this->render('base/addProject.html.twig', [
            "form" => $form->createView(),
        ]);
    }


    /**
     * @Route("/edit-project/{id}", name="edit_project")
     */
    public function edit_project(Request $request, FileUploader $fileUploader, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->find($id);
        $saveGallery = new ArrayCollection();
        $filenames = array();

        // Create an ArrayCollection of the current Tag objects in the database
        foreach ($project->getGallery() as $img) {
            $img->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $img->getFilename()));
        }
        foreach ($project->getGallery() as $img) {
            $filenames[$img->getId()] = $img->getFilename();
            $saveGallery->add($img);
        }
        // var_dump($filenames);
        $project->getBanner()->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $project->getBanner()->getFilename()));
        $project->getMiniature()->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $project->getMiniature()->getFilename()));
        $form = $this->createForm(ProjectType::class, $project);
        $saveProject = $project->getBanner()->getFilename();
        $saveMiniature = $project->getMiniature()->getFilename();
        // 2) handle the submit (will only happen on POST)

        $form->handleRequest($request);
        // var_dump($saveMiniature->getFilename());
        // var_dump($saveGallery[0]->getId());
        // var_dump($saveGallery[0]->getFilename());
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            // var_dump($filenames);

            // var_dump(count($data->getGallery()));
            foreach ($data->getGallery() as $img) {
                if ($img->getFilename() == null) {
                    if (!empty($filenames[$img->getId()])) {
                        $img->setFilename($filenames[$img->getId()]);
                    }
                }
            }
            if ($data->getBanner()->getFilename() == null)
                $data->getBanner()->setFilename($saveProject);
            if ($data->getMiniature()->getFilename() == null)
                $data->getMiniature()->setFilename($saveMiniature);
            $em = $this->getDoctrine()->getManager();
            $em->persist($project);
            $em->flush();
        }
        // replace this line with your own code!
        // return $this->redirectToRoute('projets');
        return $this->render('base/editProject.html.twig', [
            "form" => $form->createView(),
            "project" => $project,
        ]);
    }



    /**
     * @Route("delete-projet/{id}",name="deleteProjet")
     */
    public function deleteProjets($id)
    {
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->findOneBy(array('id' => $id));
        $em->remove($project);
        $em->flush();
        return $this->redirectToRoute('gestion_projects');
    }

    /**
     * @Route("/get-projet",name="getProjet")
     */
    public function getProjet(Request $request, RegistryInterface $doctrine)
    {
        $user1 = $this->getUser();
        $request_stack = $this->container->get('request_stack');
        $request = $request_stack->getCurrentRequest();
        $content = $request->getContent();
        $contentDecode = json_decode($content);
        $page = $contentDecode->page;
        $projets = $doctrine->getRepository(Projects::class)->myGetProjet($page);
        // var_dump($projets);
        // foreach ($projets as $projet) {
        // var_dump($projet->getSlug());
        // }
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceLimit(2);
        // Add Circular reference handler
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($projets, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        // dump($response);

        return $response;
    }

    /**
     * @Route("/get-projet-selection",name="getProjetSelection")
     */

    public function getProjetBYType(Request $request, RegistryInterface $doctrine)
    {
        $user1 = $this->getUser();
        $request_stack = $this->container->get('request_stack');
        $request = $request_stack->getCurrentRequest();
        $content = $request->getContent();
        $contentDecode = json_decode($content);
        $type = $contentDecode->selection;
        $page = $contentDecode->page;
        if ($type == 'All')
            $selection = $doctrine->getRepository(Projects::class)->myGetProjet($page);
        else
            $selection = $doctrine->getRepository(Projects::class)->myGetProjetByType($type, intval($page));
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceLimit(2);
        // Add Circular reference handler
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($selection, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        // dump($response);

        return $response;
    }

    /**
     * @Route("/count-projet",name="countProjet")
     */

    public function countProjet(Request $request, RegistryInterface $doctrine)
    {
        $user1 = $this->getUser();
        $request_stack = $this->container->get('request_stack');
        $request = $request_stack->getCurrentRequest();
        $content = $request->getContent();
        $contentDecode = json_decode($content);
        $type = $contentDecode->selection;
        if ($type != 'All')
            $count = $doctrine->getRepository(Projects::class)->myCountByTri($type);
        else
            $count = $doctrine->getRepository(Projects::class)->myCount();
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceLimit(2);
        // Add Circular reference handler
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($count, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        // dump($response);

        return $response;
    }


    /**
     * @Route("/gestion-technologies", name="gestion_technologies")
     */
    public function gestion_technologies()
    {
        // replace this line with your own code!
        $em = $this->getDoctrine()->getManager();
        $technologies = $em->getRepository(Technologies::class)->findAll();
        return $this->render('base/techno_gestion.html.twig', array('technologies' => $technologies));
    }

    /**
     * @Route("/new-technologie", name="new_technologie")
     */
    public function new_technologie(Request $request)
    {
        $technologie = new Technologies();
        $form = $this->createForm(TechnologieType::class, $technologie);
        // 2) handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($technologie);
            $em->flush();
            // return $this->redirectToRoute('technologie_id', ['slug' => $technologie->getSlug(), 'id' => $project->getId()]);
        }
        // replace this line with your own code!
        // return $this->redirectToRoute('projets');
        return $this->render('base/addTechnologie.html.twig', [
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("edit-technologie/{id}",name="editTechnologie")
     */
    public function editTechnologie($id)
    {
        $em = $this->getDoctrine()->getManager();
        $technologie = $em->getRepository(Technologies::class)->findOneBy(array('id' => $id));
        $em->remove($technologie);
        $em->flush();
        return $this->redirectToRoute('technologie_gestion');
    }

    /**
     * @Route("delete-technologie/{id}",name="deleteTechnologie")
     */
    public function deleteTechnologie($id)
    {
        $em = $this->getDoctrine()->getManager();
        $technologie = $em->getRepository(Technologies::class)->findOneBy(array('id' => $id));
        $em->remove($technologie);
        $em->flush();
        return $this->redirectToRoute('technologie_gestion');
    }

    public function searcharray($value, $array)
    {
        foreach ($array as $k => $val) {
            if ($val->getId() == $value) {
                return $k;
            }
        }
        return null;
    }
}
