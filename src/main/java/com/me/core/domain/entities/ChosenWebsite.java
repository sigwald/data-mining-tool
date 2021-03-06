package com.me.core.domain.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "chosen_websites")

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude = "id")
public class ChosenWebsite implements Serializable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "entry_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="dataset_id")
    @NonNull
    private DataSet dataSet;

    @OneToOne
    @JoinColumn(name="website_id")
    @NonNull
    private Website website;

    @Column(name = "is_for_learning")
    @NonNull
    private boolean isForLearning;
}
