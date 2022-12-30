package soa.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import soa.lab.entity.Organization;
import soa.lab.entity.OrganizationType;

import java.util.List;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long>, JpaSpecificationExecutor<Organization> {

    @Query("select count(o.officialAddress) from Organization as o group by o.officialAddress.zipCode, o.officialAddress.town.name, o.officialAddress.town.x, o.officialAddress.town.y")
    List<Long> getOrgsGroupCntByAddress();

    List<Organization> getOrganizationsByTypeGreaterThan(OrganizationType type);

    List<Organization> deleteOrganizationsByAnnualTurnoverEquals(Float annualTurnover);
}
