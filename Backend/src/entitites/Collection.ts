import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Container } from './Container';

@Entity()
class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  owner!: string;

  @OneToMany(() => Container, (container) => container.collection, { cascade: true })
  containers!: Container[];
}

export { Collection };
