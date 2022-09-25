

export const seedData = {
    entries: [
        {
            
            description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En Progreso: untur iure cum molestiae tempore asperiores consectetur distinctio adipisci incidunt repellendus fugit repellat saepe facere molestias',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finalizada: Ir al supermercado y comprara tres manzanas',
            status: 'finished',
            createdAt: Date.now()
        }
    ]
}