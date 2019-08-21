<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use App\Entity\Image;
use App\Service\FileUploader;

class ImageUploadListener
{
    private $uploader;

    public function __construct(FileUploader $uploader)
    {
        $this->uploader = $uploader;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

 
        if (!$entity instanceof Image) {
            
            if(method_exists($entity,'getImage'))
            {
                $entity = $entity->getImage();
                $this->uploadFile($entity);
            }
            if(method_exists($entity,'getBanner'))
            {
                $entity = $entity->getBanner();
                
                $this->uploadFile($entity);
            }
        }
        else{
            
            $this->uploadFile($entity);
        }
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {

        $entity = $args->getEntity();

         if (!$entity instanceof Image) {

            if(method_exists($entity,'getImage'))
                $entity = $entity->getImage();
        }

        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {
        
        if(!$entity instanceof Image)
        {
            return;
        }
        $file = $entity->getFilename();    

        if ($file instanceof UploadedFile) {
            $fileName = $this->uploader->upload($file);
            $entity->setFilename($fileName);
        } elseif ($file instanceof File) {
            $entity->setFilename($file->getFilename());
            
        }
        
        if ($fileName = $entity->getFilename()) {
            $entity->setPath("uploads/Thumbnail/".$fileName);
        }
        
    }
   
}