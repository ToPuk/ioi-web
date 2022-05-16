<?php

namespace App\Controller;

use App\Entity\Announcement;
use App\Entity\DoctorInfo;
use App\Entity\EquipmentInfo;
use App\Entity\EquipmentNameGeneral;
use App\Entity\Hospital;
use App\Entity\HospitalAmbulatory;
use App\Entity\HospitalAmbulatoryType;
use App\Entity\HospitalDepartment;
use App\Entity\HospitalOr;
use App\Entity\HospitalSpecialUnit;
use App\Entity\HospitalSpecialUnitType;
use App\Entity\ProfessionalIndex;
use App\Entity\Tender;
use App\Form\HospitalExcelType;
use App\Form\HospitalOrType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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

}
