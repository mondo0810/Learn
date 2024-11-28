package com.example.t2303e_wcd.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "indexer")
public class Indexer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_id")
    private int indexId;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "valueMin", nullable = false)
    private float valueMin;

    @Column(name = "valueMax", nullable = false)
    private float valueMax;

    // Bidirectional relationship: One Indexer can have many Players
    @OneToMany(mappedBy = "indexer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Player> players;
}
