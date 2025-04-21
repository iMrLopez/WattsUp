import { Badge } from './badge.component';

export default function ResultsComponent({ duration, energy, cost }: any) {
    return (
        <div className="flex flex-row">
          <div className="mr-2 max-w-[36ch] flex-1">
            <Badge value={duration} label="Tiempo de carga" />
          </div>
          <div className="max-w-[32ch] max-w-[40ch] flex-1">
            <Badge value={energy} label="Kwh consumidos" />
          </div>
          <div className=" ml-2 max-w-[200px] max-w-[40ch]">
            <Badge value={cost} label="Costo estimado" />
          </div>
        </div>
      )
}