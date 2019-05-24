<?php

namespace App\Repository;

use App\Entity\Projects;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Projects|null find($id, $lockMode = null, $lockVersion = null)
 * @method Projects|null findOneBy(array $criteria, array $orderBy = null)
 * @method Projects[]    findAll()
 * @method Projects[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjectsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Projects::class);
    }

    // /**
    //  * @return Projects[] Returns an array of Projects objects
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
        ->orderBy('b.date','ASC')
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
        ->orderBy('b.date','ASC')
      
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
    /*
    public function findOneBySomeField($value): ?Projects
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
