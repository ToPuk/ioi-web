<?php


namespace App\Box;

use App\Entity\EMBaiguullaga;
use App\Entity\EMBLicense;
use App\Entity\Hospital;
use App\Entity\HospitalLicense;
use App\Entity\HospitalMagadlan;
use App\Entity\Magadlan;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp;
use GuzzleHttp\Client;
use PhpParser\Node\Expr\Array_;

class ValidatorBox
{

    /**
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function checkCompany($vatNo, EntityManagerInterface $em) {
        $embInfo =  $this->checkLicense($vatNo);
        $vatInfo = $this->checkCompany($vatNo);
        $this->em = $em;
        return ['emb'=>$embInfo, 'vat' => $vatInfo];
    }

    public function checkVAT($vatNo) {
//        try {
//            $client = new Client([
//                'headers' => [ 'Content-Type' => 'application/json' ]
//            ]);
//            $param = ['username'=>'T00003', 'password'=>'dno10yqc'];
//            $resp = $client->request('POST', 'https://st-itax.mta.mn/rest/tais-tpi-ims-service/token/getToken', [
//                'body' => json_encode($param)
//            ]);
//
//            $token = $resp->getBody()->getContents();
//            $client = new Client([
//                'headers' => [
//                    'Authorization' => 'Bearer ' . $token
//                ]
//            ]);
//            $paramString = '?pin=' .$vatNo. '&usage=Эрүүл Мэндийн Даатгал&for_usage=Сонгон Шалгаруулалт&year=2020';
//            $result = $client->request('GET', 'https://st-itax.mta.mn/rest/tais-tpi-enquiry-service/enquiry/getOrg'.$paramString);
//            $contentJsonString = $result->getBody()->getContents();
//            $content = json_decode($contentJsonString, true);
//            $debts = $content['debts'];
//            $name = "";
//
//            if (array_key_exists("tpInfo", $content)) {
//                $info = $content["tpInfo"];
//                if (array_key_exists("name", $info)) {
//                    $name = $info["name"];
//                }
//            }
//
//
//            if ($debts) {
//                if (count($debts) > 0 ) {
//                    return Array('error'=>'','name'=>$name, 'debt'=>true, 'response'=>$content);
//                }else{
//                    return Array('error'=>'','name'=>$name, 'debt'=>false, 'response'=>$content);
//                }
//            }else{
//                return Array('error'=>'','name'=>$name, 'debt'=>false, 'response'=>$content);
//            }
//
//        }catch (\Exception $e) {
//            return Array('error'=>$e->getMessage(), 'name'=> '', 'debt'=>false, 'response'=>'{}');
//        }
        return Array('error'=>'', 'name'=> '', 'debt'=>false, 'response'=>'{}');
    }


    public function checkLicense(EMBaiguullaga $emb): array{
        $hospital = $this->em->getRepository(Hospital::class)->findOneBy(array('emb'=>$emb));

        try {
//            $client = new Client();
//            $urlstring = 'http://license.moh.gov.mn/api/check/emb?regNumber='.$vatNo;
//            $resp = $client->request('GET', $urlstring);
//            dump($resp);
//            $result = json_decode($resp->getBody()->getContents(), true);
            if (!$hospital) {
                $hospital = new Hospital();
                $hospital->setCertificateNo($emb->getRegNum());
                $hospital->setName($emb->getCompanyName());
                $hospital->setEmb($emb);
                $this->em->persist($hospital);
                $this->em->flush();
            }

            $qb = $this->em->getRepository(EMBLicense::class)->createQueryBuilder('l');
            $embLicenses = $qb
                ->addSelect('aimag')
                ->addSelect('soumDuureg')
                ->leftJoin('l.aimag','aimag')
                ->leftJoin('l.soumDuureg','soumDuureg')
                ->andWhere('l.emb = :emdId')
                ->andWhere('l.status = :status')
                ->setParameter('emdId',$emb)
                ->setParameter('status','active')
                ->setMaxResults(1)
                ->getQuery()
                ->getResult();

            if($embLicenses) {
                /** @var EMBLicense $item */
                foreach ($embLicenses as $item) {
                    /** @var HospitalLicense $licenseOld */
                    $licenseOld = $this->em->getRepository(HospitalLicense::class)->findOneBy(array('licenseNumber' => $item->getLicenseNumber(), 'hospital'=>$hospital));

                    if ($licenseOld) {
                        if (!$licenseOld->getUpdatedDate() or $licenseOld->getUpdatedDate() < $item->getUpdatedDate()) {

                            $licenseOld->setHospital($hospital);
                            $licenseOld->setRegNumber($item->getRegNumber());
                            $licenseOld->setLicenseNumber($item->getLicenseNumber());
                            if ($item->getValidDate()) {
                                $licenseOld->setValidDate($item->getValidDate());
                                $licenseOld->setValidDateStatus(0);
                            }
                            if ($item->getIssueDate()) {
                                $licenseOld->setIssueDate($item->getIssueDate());
                                $licenseOld->setIssueDateStatus(0);
                            }
                            if ($item->getUpdatedDate()) {
                                $licenseOld->setUpdatedDate($item->getUpdatedDate());
                            }
                            if ($item->getFieldoFact() != $licenseOld->getFieldoFact()) {
                                $licenseOld->setFieldoFact($item->getFieldoFact());
                                $licenseOld->setFieldoFactStatus(0);
                            }
                            if ($licenseOld->getAimagName() != $item->getAimag()->getNameL()) {
                                $licenseOld->setAimagName($item->getAimag()->getNameL());
                                $licenseOld->setAimagNameStatus(0);
                            }
                            if ($licenseOld->getSoumName() != $item->getSoumDuureg()->getNameL()) {
                                $licenseOld->setSoumName($item->getSoumDuureg()->getNameL());
                                $licenseOld->setSoumNameStatus(0);
                            }
                            if ($licenseOld->getLocationCode() != $item->getLocationCode()) {
                                $licenseOld->setLocationCode($item->getLocationCode());
                                $licenseOld->setLocationCodeStatus(0);
                            }
                            if ($licenseOld->getAddress() != $item->getAddress()) {
                                $licenseOld->setAddress($item->getAddress());
                            }

                            $licenseOld->setStatus('unknown');
                            $this->em->persist($licenseOld);
                            $this->em->flush();
                        }
                    } else {
                        $license = new HospitalLicense();
                        $license->setHospital($hospital);
                        $license->setRegNumber($item->getRegNumber());
                        $license->setLicenseNumber($item->getLicenseNumber());
                        if ($item->getValidDate()) {
                            $license->setValidDate($item->getValidDate());
                        }
                        if ($item->getIssueDate()) {
                            $license->setIssueDate($item->getIssueDate());
                        }
                        $license->setUpdatedDate(new \DateTime('now'));
                        if ($item->getFieldoFact()) {
                            $license->setFieldoFact($item->getFieldoFact());
                        }
                        if ($item->getAimag()->getNameL()) {
                            $license->setAimagName($item->getAimag()->getNameL());
                        }
                        if ($item->getSoumDuureg()->getNameL()) {
                            $license->setSoumName($item->getSoumDuureg()->getNameL());
                        }
                        if ($item->getLocationCode()) {
                            $license->setLocationCode($item->getLocationCode());
                        }
                        if ($item->getAddress()) {
                            $license->setAddress($item->getAddress());
                        }
                        if ($item->getEmbType()){
                            $license->setEmbType($item->getEmbType());
                        }
                        $license->setStatus('unknown');
                        $this->em->persist($license);
                        $this->em->flush();
                    }
                }
            }else{
                $license = $this->em->getRepository(HospitalLicense::class)->findOneBy(array('hospital' => $hospital));
                if(!$license) {
                    $license = new HospitalLicense();
                    $license->setHospital($hospital);
                    $license->setRegNumber($hospital->getCertificateNo());
                    $license->setUpdatedDate(new \DateTime('now'));
                    $license->setStatus('unknown');
                    $this->em->persist($license);
                    $this->em->flush();
                }
            }

            $qb = $this->em->getRepository(Magadlan::class)->createQueryBuilder('m');
            $embMagadlans = $qb
                ->addSelect('aimag')
                ->addSelect('soumDuureg')
                ->leftJoin('m.aimag','aimag')
                ->leftJoin('m.soumDuureg','soumDuureg')
                ->andWhere('m.emb = :emdId')
                ->setParameter('emdId',$emb)
                ->setMaxResults(1)
                ->getQuery()
                ->getResult();

            if($embMagadlans){
                /** @var Magadlan $item */
                foreach ($embMagadlans as $item) {
                    /** @var HospitalMagadlan $magadlanOld */
                    $magadlanOld = $this->em->getRepository(HospitalMagadlan::class)->findOneBy(array('batlamjNumber' => $item->getBatlamjNumber()));
                    if($magadlanOld) {
                        if (!$magadlanOld->getUpdatedDate() or $magadlanOld->getUpdatedDate() < $item->getUpdatedDate()) {
                            $magadlanOld->setHospital($hospital);
                            $magadlanOld->setRegNum($item->getRegNum());
                            $magadlanOld->setBatlamjNumber($item->getBatlamjNumber());
                            if ($item->getValidStartDate()) {
                                $magadlanOld->setValidStartDate($item->getValidStartDate());
                                $magadlanOld->setValidStartDateStatus(0);
                            }
                            if ($item->getValidEndDate()) {
                                $magadlanOld->setValidEndDate($item->getValidEndDate());
                                $magadlanOld->setValidEndDateStatus(0);
                            }
                            if ($item->getUpdatedDate()) {
                                $magadlanOld->setUpdatedDate($item->getUpdatedDate());
                            }
                            if($magadlanOld->getValidYear() != $item->getValidYear()) {
                                $magadlanOld->setValidYear($item->getValidYear());
                                $magadlanOld->setValidYearStatus(0);
                            }
                            if($item->getAimag()) {
                                if ($magadlanOld->getAimagName() != $item->getAimag()->getNameL()) {
                                    $magadlanOld->setAimagName($item->getAimag()->getNameL());
                                    $magadlanOld->setAimagNameStatus(0);
                                }
                            }
                            if($item->getSoumDuureg()) {
                                if ($magadlanOld->getSoumName() != $item->getSoumDuureg()->getNameL()) {
                                    $magadlanOld->setSoumName($item->getSoumDuureg()->getNameL());
                                    $magadlanOld->setSoumNameStatus(0);
                                }
                            }
                            $magadlanOld->setStatus('unknown');
                            $this->em->persist($magadlanOld);
                            $this->em->flush();
                        }
                    }
                    else {
                        $magadlan = new HospitalMagadlan();
                        $magadlan->setHospital($hospital);
                        $magadlan->setRegNum($item->getRegNum());
                        $magadlan->setBatlamjNumber($item->getBatlamjNumber());
                        if($item->getValidStartDate()) {
                            $magadlan->setValidStartDate($item->getValidStartDate());
                        }
                        if($item->getValidEndDate()) {
                            $magadlan->setValidEndDate($item->getValidEndDate());
                        }
                        if($item->getValidYear()) {
                            $magadlan->setUpdatedDate(new \DateTime('now'));
                        }
                        if($item->getValidYear()) {
                            $magadlan->setValidYear($item->getValidYear());
                        }
                        if($item->getAimag()) {
                            $magadlan->setAimagName($item->getAimag()->getNameL());
                        }
                        if($item->getSoumDuureg()) {
                            $magadlan->setSoumName($item->getSoumDuureg()->getNameL());
                        }
                        $magadlan->setStatus('unknown');
                        $this->em->persist($magadlan);
                        $this->em->flush();
                    }
                }
            }else{
                $magadlan = $this->em->getRepository(HospitalMagadlan::class)->findOneBy(array('hospital' => $hospital));
                if(!$magadlan) {
                    $magadlan = new HospitalMagadlan();
                    $magadlan->setHospital($hospital);
                    $magadlan->setRegNum($hospital->getCertificateNo());
                    $magadlan->setUpdatedDate(new \DateTime('now'));
                    $magadlan->setStatus('unknown');
                    $this->em->persist($magadlan);
                    $this->em->flush();
                }
            }

            $this->em->flush();
        }catch (\Exception $e) {
            dump($e);
            return Array('error'=>$e->getMessage(), 'name'=> '', 'status'=>'', 'response'=>'{}');
        }
        return Array('status'=>'ok');
    }

}