import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Bull } from '../../bull/entities/bull.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'User unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedPassword123', description: 'User hashed password', writeOnly: true })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'John', description: 'User first name', required: false })
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name', required: false })
  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @ApiProperty({ example: '2024-01-21T10:00:00Z', description: 'User creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-21T10:00:00Z', description: 'User last update timestamp' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => [Bull], description: 'User favorite bulls' })
  @ManyToMany(() => Bull, { eager: false })
  @JoinTable({
    name: 'user_favorites',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'bull_id', referencedColumnName: 'id' },
  })
  favorites: Bull[];
}