package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class Location {
    @JsonIgnore
    private long id;
    private Integer x;
    private Float y;
    private String name;
}
