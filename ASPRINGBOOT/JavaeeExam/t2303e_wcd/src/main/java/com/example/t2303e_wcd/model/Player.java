package com.example.t2303e_wcd.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private int playerId;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "full_name", nullable = false, length = 128)
    private String fullName;

    @Column(name = "age", nullable = false, length = 10)
    private String age;

    // Many Players can reference one Indexer
    @ManyToOne
    @JoinColumn(name = "index_id", nullable = false)
    private Indexer indexer;
}
