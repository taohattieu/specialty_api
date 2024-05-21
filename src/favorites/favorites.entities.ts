import { SpecialtyEntity } from "src/specialty/specialty.entities";
import { AccountEntity } from "src/user/account/entities/account.entities";
import { CreateDateColumn, Entity, JoinColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class FavoritesEntity {
    @PrimaryGeneratedColumn('uuid')
    favorites_id: string

    @CreateDateColumn()
    createdAt: string;

    @ManyToMany(() => AccountEntity, (account) => account.favorites)
    @JoinTable({ // Tạo bảng trung gian
        name: 'account_favorite_specialty', // Tên bảng trung gian
        joinColumn: {
            name: 'favorites_id',
            referencedColumnName: 'favorites_id'
        },
        inverseJoinColumn: {
            name: 'account_id',
            referencedColumnName: 'account_id'
        }
    })
    account: AccountEntity;

    @ManyToMany(() => SpecialtyEntity, (specialty) => specialty.favorites)
    @JoinTable({ // Tạo bảng trung gian
        name: 'specialty_favorite_account', // Tên bảng trung gian
        joinColumn: {
            name: 'favorites_id',
            referencedColumnName: 'favorites_id'
        },
        inverseJoinColumn: {
            name: 'specialty_id',
            referencedColumnName: 'specialty_id'
        }
    })
    specialty: SpecialtyEntity;
}
