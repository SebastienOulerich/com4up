<?php
// src/DataFixtures/AppFixtures.php
namespace App\DataFixtures;

use App\Entity\Projects;
use App\Entity\Image;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Technologies;

class ProjectFixtures extends Fixture
{

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        $technoArray = array(
            "html" => "<i class=\"fab fa-html5\"></i>",
            "css" => "<i class=\"fab fa-css3\"></i>",
            "symfony" => "<i class=\"fab fa-symfony\"></i>",
            "VueJs" => "<i class=\"fab fa-vuejs\"></i>",
        );

        $project1 = new Projects();

        $project1->setTitle("Faerith's");
        $project1->setDescription("Collectif de créateurs de contenus sur Internet (vidéos, lives, articles …), principalement axé sur le jeux vidéo ainsi que la culture geek. Faerith’s se démarque de par son fort aspect communautaire avec à sa disposition : un serveur vocal/textuel Discord, des serveurs de jeux et un site web comprenant de nombreuses features.");
        $project1->setClient("Nous meme");
        $project1->setDate(new \Datetime("now"));
        $project1->setCategorie("web");
        $project1->setTechno("none");
        $project1->setURLSite("https://faeriths.fr");

        $project1image1 = new Image();
        $project1image1->setPath('/images/projets/faeriths_banniere.jpg');
        $project1image1->setFileName("faeriths_banniere.jpg");
        $project1image1->setAlt("Faerith's banniere");
        $manager->persist($project1image1);
        $project1->setBanner($project1image1);

        $project1image2 = new Image();
        $project1image2->setPath('/images/projets/faeriths.jpg');
        $project1image2->setFileName("faeriths.jpg");
        $project1image2->setAlt("Miniature Faerith's");
        $manager->persist($project1image2);
        $project1->setMiniature($project1image2);

        foreach ($technoArray as $key => $value) {
            $technos = new Technologies();
            $technos->setIcon($value);
            $technos->setName($key);
            $manager->persist($technos);
            $project1->addTechnology($technos);

        }
        $project1imageGallery1 = new Image();
        $project1imageGallery1->setPath('/images/projets/fas1.jpg');
        $project1imageGallery1->setFileName("fas1.jpg");
        $project1imageGallery1->setAlt("Exemple Faerith's 1");
        $project1->addGallery($project1imageGallery1);

        $project1imageGallery2 = new Image();
        $project1imageGallery2->setPath('/images/projets/fas2.jpg');
        $project1imageGallery2->setFileName("fas2.jpg");
        $project1imageGallery2->setAlt("Exemple Faerith's 2");
        $project1->addGallery($project1imageGallery2);

        $project1imageGallery3 = new Image();
        $project1imageGallery3->setPath('/images/projets/fas3.jpg');
        $project1imageGallery3->setFileName("fas3.jpg");
        $project1imageGallery3->setAlt("Exemple Faerith's 3");
        $project1->addGallery($project1imageGallery3);


        $manager->persist($project1);

        //projet 2

        $project2 = new Projects();

        $project2->setTitle("Com4Up");
        $project2->setDescription("« Com » pour la Communication Digitale.
« 4 » jeu de mot entre \"four\" (4) et \"for\", mot anglais signifiant \"Pour\".
« Up » signifie l’Upgrade, le fait de passer à un niveau superieur.

Com4Up a été lancée en Septembre 2017 par 4 collaborateurs travaillant ensemble depuis 2015 sur la création du site web « Faerith’s ». Notre but avec « Com4Up » est d’accompagner les entreprises, associations et particuliers vers le numérique en proposant la création de site web, de vidéo (présentation, interview, …), l’accompagnement vers les réseaux sociaux ainsi l’installation et maintenance matériel.");
        $project2->setClient("Com4Up SAS");
        $project2->setDate(new \Datetime("now"));
        $project2->setCategorie("audiovisuel");
        $project2->setTechno("none");
        $project2->setURLSite("https://com4up.fr");

        $project2image1 = new Image();
        $project2image1->setPath('/images/projets/com4up_banniere.jpg');
        $project2image1->setFileName("com4up_banniere.jpg");
        $project2image1->setAlt("Com4Up banniere");
        $manager->persist($project2image1);
        $project2->setBanner($project2image1);

        $project2image2 = new Image();
        $project2image2->setPath('/images/projets/com4up.jpg');
        $project2image2->setFileName("com4up.jpg");
        $project2image2->setAlt("Miniature Com4up");
        $manager->persist($project2image2);
        $project2->setMiniature($project2image2);

        foreach ($technoArray as $key => $value) {
            $technos = new Technologies();
            $technos->setIcon($value);
            $technos->setName($key);
            $manager->persist($technos);
            $project2->addTechnology($technos);

        }
        $project2imageGallery1 = new Image();
        $project2imageGallery1->setPath('/images/projets/fas1.jpg');
        $project2imageGallery1->setFileName("fas1.jpg");
        $project2imageGallery1->setAlt("Exemple Faerith's 1");
        $project2->addGallery($project2imageGallery1);

        $project2imageGallery2 = new Image();
        $project2imageGallery2->setPath('/images/projets/fas2.jpg');
        $project2imageGallery2->setFileName("fas2.jpg");
        $project2imageGallery2->setAlt("Exemple Faerith's 2");
        $project2->addGallery($project2imageGallery2);

        $project2imageGallery3 = new Image();
        $project2imageGallery3->setPath('/images/projets/fas3.jpg');
        $project2imageGallery3->setFileName("fas3.jpg");
        $project2imageGallery3->setAlt("Exemple Faerith's 3");
        $project2->addGallery($project2imageGallery3);


        $manager->persist($project2);

        //projet 3

        $project3 = new Projects();

        $project3->setTitle("Esuria");
        $project3->setDescription("Je m'appelle Thomas et mon pseudo est Esuria. Je travaille en tant qu'UX/UI designer, webdesigner et vidéaste chez Com4Up. Je suis le fondateur du collectif Faerith's et co-fondateur de Streaming School. Je propose du contenu sur YouTube et je live de temps en temps sur Twitch.");
        $project3->setClient("Esuria");
        $project3->setDate(new \Datetime("now"));
        $project3->setCategorie("social");
        $project3->setTechno("none");
        $project3->setURLSite("https://esuria.fr");

        $project3image1 = new Image();
        $project3image1->setPath('/images/projets/esuria_banniere.jpg');
        $project3image1->setFileName("esuria_banniere.jpg");
        $project3image1->setAlt("Esuria banniere");
        $manager->persist($project3image1);
        $project2->setBanner($project3image1);

        $project3image2 = new Image();
        $project3image2->setPath('/images/projets/esuria.jpg');
        $project3image2->setFileName("esuria.jpg");
        $project3image2->setAlt("Miniature Esuria");
        $manager->persist($project3image2);
        $project3->setMiniature($project3image2);

        foreach ($technoArray as $key => $value) {
            $technos = new Technologies();
            $technos->setIcon($value);
            $technos->setName($key);
            $manager->persist($technos);
            $project3->addTechnology($technos);

        }
        $project3imageGallery1 = new Image();
        $project3imageGallery1->setPath('/images/projets/fas1.jpg');
        $project3imageGallery1->setFileName("fas1.jpg");
        $project3imageGallery1->setAlt("Exemple Faerith's 1");
        $project3->addGallery($project3imageGallery1);

        $project3imageGallery2 = new Image();
        $project3imageGallery2->setPath('/images/projets/fas2.jpg');
        $project3imageGallery2->setFileName("fas2.jpg");
        $project3imageGallery2->setAlt("Exemple Faerith's 2");
        $project3->addGallery($project3imageGallery2);

        $project3imageGallery3 = new Image();
        $project3imageGallery3->setPath('/images/projets/fas3.jpg');
        $project3imageGallery3->setFileName("fas3.jpg");
        $project3imageGallery3->setAlt("Exemple Faerith's 3");
        $project3->addGallery($project3imageGallery3);


        $manager->persist($project3);

        $manager->flush();
    }
}
