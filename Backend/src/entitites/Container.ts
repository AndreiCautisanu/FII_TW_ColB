import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from './Collection';

@Entity()
class Container {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  year!: number;

  @Column({ type: 'double' })
  price!: number;

  @Column()
  country!: string;

  @Column()
  hasLabel!: boolean;

  @Column({ default: 0 })
  views: number = 0;

  @ManyToOne(() => Collection, (collection) => collection.containers, { nullable: true })
  collection?: Collection;
}

export { Container };
