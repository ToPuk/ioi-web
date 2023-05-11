<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use PhpOffice\PhpSpreadsheet\IOFactory;
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
     * @Route("/contact-us", name="contact_us_index")
     */
    public function contactUs(Request $request)
    {

        return $this->render('default/contact.html.twig');

    }

    /**
     * @Route("/about-us", name="contact_us_index")
     */
    public function aboutUs(Request $request)
    {

        return $this->render('default/contact.html.twig');

    }

}
