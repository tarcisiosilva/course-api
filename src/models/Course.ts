import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    duration!: string;

    @Column()
    instructor!: string;
}
