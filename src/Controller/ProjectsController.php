<?php

namespace App\Controller;

use App\Entity\Projects;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

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
   * @Route("/projets/{slug}-{id}", name="project_id", requirements={"slug": [a-z0-9\-])
   */
  public function projet_id($slug, $id)
  {
      // replace this line with your own code!
      $project = $this->repository->find($id);
      return $this->render('base/projet_id.html.twig', ['project' => $project]);
  }

    /**
     * @Route("/new-project", name="new_project")
     */
    public function new_project()
    {
      $project = new Projects();
      $project->setTitle("test")
              ->setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
              ->setClient("Projet interne")
              ->setDate("01 mai 2019")
              ->setCategorie(2)
              ->setTechno("symphony")
              ->setURLSite("https://com4up.fr");
              $em = $this->getDoctrine()->getManager();
              $em->persist($project);
              $em->flush();
        // replace this line with your own code!
        return $this->render('base/addProject.html.twig');
    }


}
