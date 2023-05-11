<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * @Route("/")
 */
class DefaultController extends AbstractController
{

    /**
     * @Route("/", name="default_index")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/contact", name="contact_index")
     */
    public function contact(Request $request)
    {
        return $this->render('pages/contact.html.twig');
    }

    /**
     * @Route("/about-us", name="about_us_index")
     */
    public function about(Request $request)
    {
        return $this->render('pages/about.html.twig');
    }

}
