import { ApiProperty } from '@nestjs/swagger';
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

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Bull unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: '992', description: 'Bull ear tag number' })
    @Column({ unique: true, name: 'ear_tag' })
    earTag: string;

    @ApiProperty({ example: 'Toro Black Emerald', description: 'Bull name' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Angus', description: 'Bull breed' })
    @Column()
    breed: string;

    @ApiProperty({ example: 'negro', description: 'Bull coat color', enum: ['negro', 'colorado'] })
    @Column({ name: 'coat_color' })
    coatColor: string;

    @ApiProperty({ example: 'propio', description: 'Bull origin', enum: ['propio', 'catalogo'] })
    @Column()
    origin: string;

    @ApiProperty({ example: 'vaquillona', description: 'Bull usage', enum: ['vaquillona', 'vaca'] })
    @Column()
    usage: string;

    @ApiProperty({ example: 36, description: 'Bull age in months' })
    @Column({ name: 'age_months' })
    ageMonths: number;

    @ApiProperty({ example: 'Top 1% calving ease', description: 'Featured trait of the bull', required: false })
    @Column({ name: 'featured_trait', nullable: true })
    featuredTrait: string;

    @ApiProperty({ example: 85, description: 'Growth score (0-100)' })
    @Column({ type: 'int', default: 0 })
    growth: number;

    @ApiProperty({ example: 98, description: 'Calving ease score (0-100)' })
    @Column({ type: 'int', default: 0, name: 'calving_ease' })
    calvingEase: number;

    @ApiProperty({ example: 75, description: 'Reproduction score (0-100)' })
    @Column({ type: 'int', default: 0 })
    reproduction: number;

    @ApiProperty({ example: 60, description: 'Moderation score (0-100)' })
    @Column({ type: 'int', default: 0 })
    moderation: number;

    @ApiProperty({ example: 82, description: 'Carcass score (0-100)' })
    @Column({ type: 'int', default: 0 })
    carcass: number;

    @ApiProperty({ example: 82.65, description: 'Calculated bull score based on weighted stats' })
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
