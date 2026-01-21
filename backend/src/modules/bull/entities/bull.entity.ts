import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bulls')
export class Bull {
    static readonly SCORE_WEIGHTS = {
        growth: 0.3,
        calvingEase: 0.25,
        reproduction: 0.2,
        moderation: 0.15,
        carcass: 0.1,
    };

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, name: 'ear_tag' })
    earTag: string;

    @Column()
    name: string;

    @Column()
    breed: string;

    @Column({ name: 'coat_color' })
    coatColor: string; // 'black' | 'red'

    @Column()
    origin: string; // 'own' | 'catalog'

    @Column()
    usage: string; // 'heifer' | 'cow'

    @Column({ name: 'age_months' })
    ageMonths: number;

    @Column({ name: 'featured_trait', nullable: true })
    featuredTrait: string;

    // Flattened stats for easy querying and sorting
    @Column({ type: 'int', default: 0 })
    growth: number;

    @Column({ type: 'int', default: 0, name: 'calving_ease' })
    calvingEase: number;

    @Column({ type: 'int', default: 0 })
    reproduction: number;

    @Column({ type: 'int', default: 0 })
    moderation: number;

    @Column({ type: 'int', default: 0 })
    carcass: number;

    // Calculated field persisted for fast SQL sorting
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, name: 'bull_score' })
    bullScore: number;

    @BeforeInsert()
    @BeforeUpdate()
    calculateScore() {
        this.bullScore =
            (this.growth * Bull.SCORE_WEIGHTS.growth) +
            (this.calvingEase * Bull.SCORE_WEIGHTS.calvingEase) +
            (this.reproduction * Bull.SCORE_WEIGHTS.reproduction) +
            (this.moderation * Bull.SCORE_WEIGHTS.moderation) +
            (this.carcass * Bull.SCORE_WEIGHTS.carcass);
    }
}
