
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: In commodo proident esse non ex.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En progreso: Incididunt dolor nostrud nulla veniam.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Terminada: Exercitation occaecat id qui ullamco sit occaecat ullamco.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
};