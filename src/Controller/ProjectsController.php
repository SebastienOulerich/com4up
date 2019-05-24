<?php

namespace App\Controller;

use App\Entity\Projects;
use App\Form\ProjectType;

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
   * @Route("/projets/{slug}-{id}", name="project_id", requirements={"slug" : "[a-z0-9\-]*"})
   */
  public function projet_id($slug, $id)
  {
      // replace this line with your own code!
      $em = $this->getDoctrine()->getManager();
      $project = $em->getRepository(Projects::class)->find($id);
      return $this->render('base/projet_id.html.twig', ['project' => $project]);
  }

    /**
     * @Route("/new-project", name="new_project")
     */
    public function new_project(Request $request)
    {
      $project = new Projects();
      $project->setTitle("test")
              ->setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
              ->setClient("Projet interne")
              ->setDate("01 mai 2019")
              ->setCategorie("web")
              ->setTechno("symphony")
              ->setURLSite("https://com4up.fr");
              $em = $this->getDoctrine()->getManager();
              $em->persist($project);
              $em->flush();
        // replace this line with your own code!
        return $this->redirectToRoute('projets');
        // return $this->render('base/addProject.html.twig');
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

    $project = new Projects();

      $form = $this->createFormBuilder($project)
      ->add('title')
      ->add('description')
      ->add('client')
      ->add('date')
      ->add('categorie')
      ->add('techno')
      ->add('URL_site')
          ->getForm();

      $form->handleRequest($request);

      if ($form->isSubmitted() && $form->isValid()) {
          // $form->getData() holds the submitted values
          // but, the original `$task` variable has also been updated
          $project = $form->getData();

          // ... perform some action, such as saving the task to the database
          // for example, if Task is a Doctrine entity, save it!
          // $entityManager = $this->getDoctrine()->getManager();
          // $entityManager->persist($task);
          // $entityManager->flush();
          $em = $this->getDoctrine()->getManager();
          $em->persist($project);
          $em->flush();

          return $this->redirectToRoute('projets');
      }

      return $this->render('base/addProject.html.twig', [
        'project' => $project,
          'form' => $form->createView(),
      ]);

    }

     /**
     * @Route("/get-projet",name="getProjet")
     */
  /*
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
*/
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
        if($type == 'All')
            $selection = $doctrine->getRepository(Projects::class)->myGetProjet($page);
        else
            $selection = $doctrine->getRepository(Projects::class)->myGetProjetByType($type,intval($page));
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
        if($type != 'All')
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

}
