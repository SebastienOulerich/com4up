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
        $project1->addGallery($project1image1);
        $project1->addGallery($project1image2);


        $manager->persist($project1);

        $manager->flush();
    }
}
