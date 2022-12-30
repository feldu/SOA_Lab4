package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import soa.lab.dto.AddressDTO;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private long id;

    @Column(name = "zip_code", nullable = false)
    @NotNull
    @Size(max = 30)
    private String zipCode;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "town_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private Location town;

    public Address(AddressDTO officialAddressDTO) {
        this.zipCode = officialAddressDTO.getZipCode();
        this.town = new Location(officialAddressDTO.getTown());
    }
}
