<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Nom')
            ->add('Prenom')
            ->add('Email', EmailType::class)
            ->add('Entreprise')
            ->add('cateWeb', CheckboxType::class)
            ->add('cateAudiovisuel', CheckboxType::class)
            ->add('cateSocial', CheckboxType::class)
            ->add('cateMateriel', CheckboxType::class)
            ->add('Object')
            ->add('Message',  TextareaType::class)
            ->add('rgpd', CheckboxType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
