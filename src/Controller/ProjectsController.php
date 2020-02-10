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
use Symfony\Component\HttpFoundation\File\UploadedFile;

use Cocur\Slugify\Slugify;



use Symfony\Component\HttpFoundation\RequestStack;

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
use Doctrine\Persistence\ManagerRegistry;

class ProjectsController extends Controller
{
    /**
     * @Route("/projets", name="projets")
     */
    public function projets()
    {
        $em = $this->getDoctrine()->getManager();
        $projects = $em->getRepository(Projects::class)->findAll();
        return $this->render('base/projets.html.twig', array('projects' => $projects));
    }





    /**
     * @Route("/projets/{slug}", name="project_id", requirements={"slug" : "[a-z0-9\-]*"})
     */
    public function projet_id($slug)
    {
        // replace this line with your own code!
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->findOneBySlug($slug);
        $previous = $em->getRepository(Projects::class)->findOneByNext($project->getDate());
        $next = $em->getRepository(Projects::class)->findOneByPrevious($project->getDate());
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

    public function searcharray($value, $array)
    {
        foreach ($array as $k => $val) {
            if ($val->getId() == $value) {
                return $k;
            }
        }
        return null;
    }



    // API Projet

    /**
     * @Route("/get-projet",name="getProjet")
     */
    public function getProjet(Request $request, ManagerRegistry $doctrine)
    {
        #$request_stack = $this->container->get('request_stack');
        #$request = $request_stack->getCurrentRequest();
        #$content = $request->getContent();
        #$contentDecode = json_decode($content);
        #$page = $contentDecode->page;
        $page = 1;
        $projets = $doctrine->getRepository(Projects::class)->myGetProjet($page);
        #$projets = $doctrine->getRepository(Projects::class)->findAll();
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizer = new ObjectNormalizer();
        //$normalizer->setCircularReferenceLimit(2);
        //$normalizer->setCircularReferenceHandler(function ($object) {
          //  return $object->getId();
        //});

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($projets, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        return $response;
    }

    /**
     * @Route("/get-projet-selection",name="getProjetSelection")
     */

    public function getProjetBYType(Request $request, ManagerRegistry $doctrine)
    {
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
        // $normalizer->setCircularReferenceLimit(2);
        // $normalizer->setCircularReferenceHandler(function ($object) {
        //     return $object->getId();
        // });

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($selection, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        return $response;
    }

    /**
     * @Route("/count-projet",name="countProjet")
     */

    public function countProjet(Request $request, ManagerRegistry $doctrine)
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
        // $normalizer->setCircularReferenceLimit(2);
        // Add Circular reference handler
        // $normalizer->setCircularReferenceHandler(function ($object) {
        //     return $object->getId();
        // });

        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($count, 'json');

        $response = new JsonResponse();
        $response->setData($jsonContent);
        // dump($response);

        return $response;
    }




    /**
     * @Route("/cms", name="cms")
     */
    public function cms()
    {
        $em = $this->getDoctrine()->getManager();
        $technologies = $em->getRepository(Technologies::class)->findAll();
        $projects = $em->getRepository(Projects::class)->findAll();
        return $this->render('base/cms.html.twig', array(
            'technologies' => $technologies,
            'projects' => $projects,
        ));
    }

    // CMS Technologies

    /**
     * @Route("/cms/new-technologie", name="new_technologie")
     */
    public function new_technologie(Request $request)
    {
        $technologie = new Technologies();
        $form = $this->createForm(TechnologieType::class, $technologie);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($technologie);
            $em->flush();
            return $this->redirectToRoute('cms');
        }
        return $this->render('base/addTechnologie.html.twig', [
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/cms/edit-technologie/{id}",name="editTechnologie")
     */
    public function editTechnologie(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $technologie = $em->getRepository(Technologies::class)->find($id);
        $form = $this->createForm(TechnologieType::class, $technologie);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($technologie);
            $em->flush();
            return $this->redirectToRoute('cms');
        }
        return $this->render('base/addTechnologie.html.twig', [
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/cms/delete-technologie/{id}",name="deleteTechnologie")
     */
    public function deleteTechnologie($id)
    {
        $em = $this->getDoctrine()->getManager();
        $technologie = $em->getRepository(Technologies::class)->findOneBy(array('id' => $id));
        $em->remove($technologie);
        $em->flush();
        return $this->redirectToRoute('cms');
    }

    // CMS Projet

    /**
     * @Route("/cms/new-project", name="new_project")
     */
    public function new_project(Request $request, FileUploader $fileUploader)
    {
        $project = new Projects();
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $project->setSlug();
            $em->persist($project);
            $em->flush();
            return $this->redirectToRoute('project_id', ['slug' => $project->getSlug()]);
        }
        return $this->render('base/addProject.html.twig', [
            "form" => $form->createView(),
            "action" => "new",
        ]);
    }


    /**
     * @Route("/cms/edit-project/{id}", name="edit_project")
     */
    public function edit_project(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->find($id);
        $projectInfo = $em->getRepository(Projects::class)->find($id);
        $saveGallery = new ArrayCollection();
        $filenames = array();
        foreach ($project->getGallery() as $img) {
            $img->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $img->getFilename()));
        }
        foreach ($project->getGallery() as $img) {
            $filenames[$img->getId()] = $img->getFilename();
            $saveGallery->add($img);
        }
        $project->getBanner()->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $project->getBanner()->getFilename()));
        $project->getMiniature()->setFilename(new File($this->getParameter('uploadDirectory') . '/' . $project->getMiniature()->getFilename()));
        $form = $this->createForm(ProjectType::class, $project);

        $saveProject = $project->getBanner()->getFilename();
        $saveMiniature = $project->getMiniature()->getFilename();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            foreach ($data->getGallery() as $img) {
                if ($img->getFilename() == null) {
                    if (!empty($filenames[$img->getId()])) {
                        $img->setFilename($filenames[$img->getId()]);
                    }
                }
            }
            $miniatureCrop = $this->container->get('request_stack')->getCurrentRequest()->get('miniature');
            if ($data->getBanner()->getFilename() == null)
                $data->getBanner()->setFilename($saveProject);

            if ($miniatureCrop != NULL) {
                $min = $em->getRepository(Image::class)->findOneByFilename($miniatureCrop);
                $project->setMiniature($min);
            } else {
                if ($data->getMiniature()->getFilename() == null)
                    $data->getMiniature()->setFilename($saveMiniature);
            }
            $em = $this->getDoctrine()->getManager();
            $project->setSlug();

            $em->persist($project);
            $em->flush();
            return $this->redirectToRoute('project_id', ['slug' => $project->getSlug()]);
        }
        return $this->render('base/addProject.html.twig', [
            "form" => $form->createView(),
            "project" => $project,
            "action" => "edit",
            "projectInfo" => $projectInfo,
        ]);
    }

    /**
     * @Route("/cms/delete-projet/{id}",name="delete_project")
     */
    public function deleteProjets($id)
    {
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository(Projects::class)->findOneBy(array('id' => $id));
        $em->remove($project);
        $em->flush();
        return $this->redirectToRoute('cms');
    }
}
