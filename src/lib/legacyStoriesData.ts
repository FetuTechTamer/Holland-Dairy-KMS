export interface LegacyStory {
    id: string;
    authorName: string;
    authorRole: string;
    yearsOfExperience: number;
    retirementDate: string; // Ethiopian Calendar
    title: string;
    content: string;
    likes: number;
    comments: number;
    isPinned?: boolean;
}

export const legacyStories: LegacyStory[] = [
    {
        id: 'l-1',
        authorName: 'Tekle Berhan',
        authorRole: 'Production Manager',
        yearsOfExperience: 30,
        retirementDate: '15/10/2019',
        title: 'How we built the yoghurt recipe from scratch',
        content: 'When I started at Holland Dairy in 1995, we had only a small vat and a wooden spoon. The consistency wasn\'t always perfect. It took us 3 years to figure out the exact fermentation temperature that suited the Ethiopian climate. My advice to the young staff: never stop testing. The perfect recipe is a continuous journey.',
        likes: 45,
        comments: 12,
        isPinned: true
    },
    {
        id: 'l-2',
        authorName: 'Almaz Desta',
        authorRole: 'Quality Control',
        yearsOfExperience: 25,
        retirementDate: '30/12/2019',
        title: 'The evolution of quality standards at Holland Dairy',
        content: 'The most important lesson I learned about milk quality is that it starts at the cow, not the factory. Building relationships with the farmers was key. We went from basic fat percentage tests to advanced bacterial screenings. Always respect the raw ingredients.',
        likes: 38,
        comments: 8
    },
    {
        id: 'l-3',
        authorName: 'Girma Wolde',
        authorRole: 'Maintenance',
        yearsOfExperience: 28,
        retirementDate: '5/11/2019',
        title: 'Maintaining Dutch machinery in Ethiopia - lessons learned',
        content: 'My journey from junior technician to senior engineer taught me one thing: maintenance is about prevention, not repair. Dutch machinery is precise, but local voltage fluctuations are a reality. Always ensure your backup generators and voltage regulators are in top shape.',
        likes: 52,
        comments: 15
    }
];
