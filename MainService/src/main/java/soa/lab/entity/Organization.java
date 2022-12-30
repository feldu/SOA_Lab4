package soa.lab.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import soa.lab.dto.OrganizationDTO;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false)
    @NotNull
    @NotEmpty
    private String name;

    @Column(name = "employees_count", nullable = false)
    @NotNull
    @Min(0)
    private Integer employeesCount;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "coordinates_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private Coordinates coordinates;

    @Column(name = "creation_date", nullable = false)
    @NotNull
    @CreationTimestamp
    private java.time.ZonedDateTime creationDate;

    @Column(name = "annual_turnover", nullable = false)
    @NotNull
    @DecimalMin(value = "0", inclusive = false)
    private Float annualTurnover;

    @Column(name = "type")
    private OrganizationType type;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address officialAddress;

    public Organization(OrganizationDTO orgDTO) {
        this.name = orgDTO.getName();
        this.employeesCount = orgDTO.getEmployeesCount();
        this.coordinates = new Coordinates(orgDTO.getCoordinates());
        this.creationDate = orgDTO.getCreationDate();
        this.annualTurnover = orgDTO.getAnnualTurnover();
        this.type = OrganizationType.valueOf(orgDTO.getType());
        this.officialAddress = new Address(orgDTO.getOfficialAddress());
    }
}
