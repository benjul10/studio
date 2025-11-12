import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api, Session } from "../lib/api";
import { fmtDate, addDays } from "../lib/dates";

type DashboardProps = {
  onNewShooting?: () => void;
  onAddDecor?: () => void;
};

export default function Dashboard({ onNewShooting, onAddDecor }: DashboardProps) {
  const [todayCount, setTodayCount] = useState<number>(0);
  const [weekCount, setWeekCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr(null);

        const today = new Date();
        const todayStr = fmtDate(today);
        const in7Str = fmtDate(addDays(today, 7));

        // Sessions du jour
        const todaySessions: Session[] = await api.listSessions({ from: todayStr, to: todayStr });
        setTodayCount(todaySessions.length);

        // Sessions sur 7 jours (aujourd’hui inclus)
        const weekSessions: Session[] = await api.listSessions({ from: todayStr, to: in7Str });
        setWeekCount(weekSessions.length);
      } catch (e: any) {
        setErr(e.message ?? "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium">Tableau de bord</h2>
      </div>

      {err && (
        <div className="mb-4 text-red-600">Erreur: {err}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shootings aujourd’hui</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : todayCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shootings cette semaine</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : weekCount}
            </div>
          </CardContent>
        </Card>

        {/* Tu peux ajouter d’autres tuiles en appelant api.listPrestataires / listArticles / listLieux */}
      </div>
    </div>
  );
}
