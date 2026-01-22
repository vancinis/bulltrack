import { DataSource } from 'typeorm';
import { Bull } from '../../../modules/bull/entities/bull.entity';

export async function seedBulls(dataSource: DataSource): Promise<void> {
  const bullRepository = dataSource.getRepository(Bull);

  console.log('Seeding bulls...');

  const bulls = [
    {
      earTag: '992',
      name: 'Toro Black Emerald',
      breed: 'Angus',
      coatColor: 'negro',
      origin: 'propio',
      usage: 'vaquillona',
      ageMonths: 36,
      featuredTrait: 'Top 1% calving ease',
      growth: 85,
      calvingEase: 98,
      reproduction: 75,
      moderation: 60,
      carcass: 82,
    },
    {
      earTag: '845',
      name: 'Red Diamond',
      breed: 'Angus',
      coatColor: 'colorado',
      origin: 'catalogo',
      usage: 'vaca',
      ageMonths: 42,
      featuredTrait: 'Top 5% carcass',
      growth: 90,
      calvingEase: 40,
      reproduction: 88,
      moderation: 70,
      carcass: 95,
    },
    {
      earTag: '102',
      name: 'General 102',
      breed: 'Angus',
      coatColor: 'negro',
      origin: 'propio',
      usage: 'vaquillona',
      ageMonths: 56,
      featuredTrait: 'Top 1% calving ease',
      growth: 95,
      calvingEase: 60,
      reproduction: 82,
      moderation: 0,
      carcass: 0,
    },
    {
      earTag: '103',
      name: 'Brangus Elite',
      breed: 'Brangus',
      coatColor: 'negro',
      origin: 'catalogo',
      usage: 'vaquillona',
      ageMonths: 30,
      featuredTrait: undefined,
      growth: 70,
      calvingEase: 92,
      reproduction: 65,
      moderation: 80,
      carcass: 60,
    },
    {
      earTag: '554',
      name: 'Indomable',
      breed: 'Hereford',
      coatColor: 'colorado',
      origin: 'propio',
      usage: 'vaca',
      ageMonths: 48,
      featuredTrait: undefined,
      growth: 60,
      calvingEase: 30,
      reproduction: 95,
      moderation: 50,
      carcass: 75,
    },
    {
      earTag: '210',
      name: 'Midnight Express',
      breed: 'Angus',
      coatColor: 'negro',
      origin: 'propio',
      usage: 'vaquillona',
      ageMonths: 28,
      featuredTrait: 'Efficiency Leader',
      growth: 78,
      calvingEase: 95,
      reproduction: 82,
      moderation: 85,
      carcass: 68,
    },
    {
      earTag: '773',
      name: 'Rustic King',
      breed: 'Braford',
      coatColor: 'colorado',
      origin: 'catalogo',
      usage: 'vaca',
      ageMonths: 54,
      featuredTrait: 'Heat Tolerant',
      growth: 92,
      calvingEase: 35,
      reproduction: 90,
      moderation: 45,
      carcass: 88,
    },
    {
      earTag: '304',
      name: 'Shadow Warrior',
      breed: 'Brangus',
      coatColor: 'negro',
      origin: 'propio',
      usage: 'vaquillona',
      ageMonths: 32,
      featuredTrait: 'Performance Pro',
      growth: 88,
      calvingEase: 85,
      reproduction: 70,
      moderation: 65,
      carcass: 91,
    },
  ];

  for (const bullData of bulls) {
    const existing = await bullRepository.findOne({
      where: { earTag: bullData.earTag },
    });

    if (existing) {
      console.log(`  ℹ Bull ${bullData.name} (${bullData.earTag}) already exists, skipping...`);
      continue;
    }

    const bull = bullRepository.create(bullData);
    await bullRepository.save(bull);
    console.log(`  ✓ Bull ${bullData.name} created with score: ${bull.bullScore}`);
  }
}
