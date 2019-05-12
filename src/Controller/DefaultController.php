<?php

namespace App\Controller;



use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        // replace this line with your own code!
        return $this->render('base/index.html.twig');
    }

    /**
     * @Route("/services", name="services")
     */
    public function services()
    {
        // replace this line with your own code!
        return $this->render('base/services.html.twig');
    }

    /**
     * @Route("/services-web", name="services_web")
     */
    public function services_web()
    {
        // replace this line with your own code!
        return $this->render('base/services_web.html.twig');
    }

    /**
     * @Route("/services-audiovisuel", name="services_audiovisuel")
     */
    public function services_audiovisuel()
    {
        // replace this line with your own code!
        return $this->render('base/services_audiovisuel.html.twig');
    }

    /**
     * @Route("/services-social", name="services_social")
     */
    public function services_social()
    {
        // replace this line with your own code!
        return $this->render('base/services_social.html.twig');
    }

    /**
     * @Route("/services-materiel", name="services_materiel")
     */
    public function services_materiel()
    {
        // replace this line with your own code!
        return $this->render('base/services_materiel.html.twig');
    }

    /**
     * @Route("/services-materiel-tarifs", name="services_materiel_tarifs")
     */
    public function services_materiel_tarifs()
    {
        // replace this line with your own code!
        return $this->render('base/services_materiel_tarif.html.twig');
    }

    /**
     * @Route("/equipe", name="equipe")
     */
    public function equipe()
    {
        // replace this line with your own code!
        return $this->render('base/equipe.html.twig');
    }

    /**
     * @Route("/a-propos", name="a_propos")
     */
    public function a_propos()
    {
        // replace this line with your own code!
        return $this->render('base/a_propos.html.twig');
    }


    /**
     * @Route("/mentions-legales", name="mentions_legales")
     */
    public function mentions_legales()
    {
        // replace this line with your own code!
        return $this->render('base/mentions_legales.html.twig');
    }
}
