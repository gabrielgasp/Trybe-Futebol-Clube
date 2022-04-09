import { Request, Response, Router } from 'express';
import { IClubsService } from '../typescript/interfaces';

export class ClubsRouter {
  constructor(
    public router: Router,
    private clubsService: IClubsService,
  ) {
    this.getAllClubs();
    this.getClubById();
  }

  private getAllClubs(): void {
    this.router.get(
      '/',
      async (req: Request, res: Response) => {
        const clubs = await this.clubsService.getAllClubs();
        return res.status(200).json(clubs);
      },
    );
  }

  private getClubById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const club = await this.clubsService.getClubById(req.params.id);
        return club ? res.status(200).json(club)
          : res.status(404).json({ message: 'Club not found' });
      },
    );
  }
}
