import { BaseEntity, Entity, Column, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Unique(['id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column({ default: false })
    phoneVerified: boolean;
}