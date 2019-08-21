<?php

namespace App\Form;

use App\Entity\Image;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\FormInterface;


class ImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
           ->add('alt')
           ->add('filename', FileType::class, ['label' => 'Upload the thumbnail'])
            ;
}

    // public function configureOptions(OptionsResolver $resolver)
    public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Image::class,
            ]);
            // $resolver->setDefaults(array(
            //     'empty_data' => function (FormInterface $form) {
            //         return new Image($form->get('title')->getData());
            //     },
            // ));
        }

}
