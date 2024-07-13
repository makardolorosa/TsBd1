import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  email: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column({ type: 'bool', nullable: true, default: false })
  isActive: boolean;
}
