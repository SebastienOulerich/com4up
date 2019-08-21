<?php

namespace App\Repository;

use App\Entity\Image;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Image|null find($id, $lockMode = null, $lockVersion = null)
 * @method Image|null findOneBy(array $criteria, array $orderBy = null)
 * @method Image[]    findAll()
 * @method Image[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Image::class);
    }

    // /**
    //  * @return Image[] Returns an array of Image objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
    public function myGetProjet($page)
    {
        return $this->createQueryBuilder('b')
        ->setFirstResult(($page-1)*6)
        ->setMaxResults(6)
        ->orderBy('b.date','DESC')
        ->getQuery()
        ->getResult()
        ;
    }
    public function myGetProjetByType($categorie,$page)
    {
        $query =  $this->createQueryBuilder('b')
        ->where('b.categorie = :categorie')
        ->setParameter('categorie', $categorie)
        ->setFirstResult(($page-1)*6)
        ->setMaxResults(6)
        ->orderBy('b.date','DESC')
      
        ->getQuery()
        ->getResult()
        ;
        return $query;
    }

    public function myCount()
    {
        return $this->createQueryBuilder('b')
            ->select('count(b)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }
    public function myCountByTri($categorie)
    {
        return $this->createQueryBuilder('b')
            ->select('count(b)')
            ->where("b.categorie like :categorie")
            ->setParameter("categorie" , $categorie)
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }
    public function findOneByNext($date)
    {
        return $this->createQueryBuilder('b')
            ->select('b.id')
            ->addSelect('b.title')
            ->where("b.date > :date")
            ->setParameter("date" , $date)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    public function findOneByPrevious($date)
    {
        return $this->createQueryBuilder('b')
            ->select('b.id')
            ->addSelect('b.title')
            ->where("b.date < :date")
            ->setParameter("date" , $date)
            ->setMaxResults(1)
            ->orderBy('b.date','DESC')
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

}