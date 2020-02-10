<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bridge\Doctrine\RegistryInterface;
use App\Entity\Image;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class UploadController extends AbstractController
{
    /**
     * @Route("/upload", name="upload")
     */
    public function upload(Request $request, RegistryInterface $doctrine)
    {
        if (isset($_FILES['image']['name'])) {
            $file = $_FILES['image']['tmp_name'];
            $type = $_POST['type'];
            $file_name = $_FILES['image']['name'];
            $file_name_array = explode(".", $file_name);
            // $extension =  $_FILES['image']['type'];
            $extension =  $extension = explode('/', $_FILES['image']['type'])[1];
            $new_image_name = rand() . '.' . $extension;
            // $new_image_name = 'jetest.' . $extension;
            // chmod('%kernel.project_dir%/public/uploads/Thumbnail', 0777);
            $allowed_extension = array("jpg", "gif", "png");
            if (in_array($extension, $allowed_extension)) {
                move_uploaded_file($file, $_SERVER["DOCUMENT_ROOT"] . "/uploads/Thumbnail/" . $new_image_name);
            }
            if ($_POST['id']){
                $test =$_POST['id'];
                var_dump($test);
            }
            else{
                $image = new Image();
                $image->setFilename($new_image_name);
                $image->setPath("uploads/Thumbnail/" . $new_image_name);
                $image->setAlt("balek");
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();
            $encoders = array(new XmlEncoder(), new JsonEncoder());
            $normalizer = new ObjectNormalizer();
            // $normalizer->setCircularReferenceLimit(2);
            // $normalizer->setCircularReferenceHandler(function ($object) {
            //     return $object->getId();
            // });
            $arr = array('name' => $new_image_name, 'type' =>$type);
            $normalizers = array($normalizer);
            $serializer = new Serializer($normalizers, $encoders);
            $jsonContent = $serializer->serialize($arr, 'json');

            $response = new JsonResponse();
            $response->setData($jsonContent);
            return $response;
        }
        // return new JsonResponse(200,);
    }
}
