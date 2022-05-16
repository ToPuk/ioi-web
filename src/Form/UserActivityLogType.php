<?php

namespace App\Form;


use App\Entity\UserActivityLog;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class UserActivityLogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('activityType')
            ->add('data')
            ->add('activityDate')
            ->add('userId')
            ->add('userEmail')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => UserActivityLog::class,
        ]);
    }
}
