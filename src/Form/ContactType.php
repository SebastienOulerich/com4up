<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom', TextType::class)
            ->add('prenom', TextType::class)
            ->add('email', EmailType::class ,array('label'=> 'E-Mail',))
            ->add('entreprise', TextType::class ,array(
                "required" => false,
                'label'=> 'Entreprise/Organisme  - (Optionnel)',))
              ->add('cate', ChoiceType::class, [
                    'choices'=> array(
                        'Site web' => 'Site web',
                        'Audiovisuel' => 'Audiovisuel',
                        'Réseaux sociaux' => 'Réseaux sociaux',
                        'Matériel' => 'Matériel',
                    ),
                    'expanded' => true,
                    'multiple' => true,])
            ->add('objet', TextType::class  ,array(
                'attr' => [ 'require' => true,],))
            ->add('message',  TextareaType::class  ,array(
                'attr' => [ 'require' => true,],))
            ->add('rgpd', CheckboxType::class ,array(
                'attr' => ['require' => true,],
                'label'=> '  En soumettant ce formulaire, j\'accepte que les informations saisies dans ce formulaire soient utilisées, exploitées, traitées pour permettre de me recontacter, pour m’envoyer la newsletter, dans le cadre de la relation commerciale qui découle de
                    cette demande de devis.',
            ))
        ;
    }



    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
