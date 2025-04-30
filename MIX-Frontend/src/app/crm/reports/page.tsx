'use client';

import { useEffect, useState, useMemo } from 'react';
import { useFullProfile } from '@/hooks/useFullProfile';
import { url } from '@/utils/constants';
import { LoadingSpinner } from '@/components/LoadingSpinner';

import {
  BoxClosedIndividual,
  BoxClosedTeam,
  BoxComisionesIndividual,
  BoxComisionesTeam,
  LinesChartIndividual,
  LinesChartTeam,
  PieChartIndividual,
  PieChartTeam,
} from '@/components/Dashboard/final';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'team' | 'individual'>('team');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [teamMembersData, setTeamMembersData] = useState<any[]>([]);
  const [teamSalesData, setTeamSalesData] = useState<any[]>([]);
  const [teamCommissionsData, setTeamCommissionsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, loading } = useFullProfile();
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(profile);
  useEffect(() => {
    if (!loading && profile) {
      setIsAdmin(profile.isAdmin);
    }
  }, [loading, profile]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [membersRes, salesRes, commissionsRes] = await Promise.all([
          fetch(`${url}/report/SalesInfoMember`, { credentials: 'include' }),
          fetch(`${url}/report/SalesTeam`, { credentials: 'include' }),
          fetch(`${url}/report/ComissionTeam`, { credentials: 'include' }),
        ]);
        const members = await membersRes.json();
        const sales = await salesRes.json();
        const commissions = await commissionsRes.json();

        setTeamMembersData(members);
        setTeamSalesData(sales);
        setTeamCommissionsData(commissions);
      } catch (error) {
        console.error('Failed to fetch team report data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) fetchData();
  }, [isAdmin, reportType]);

  const currentData = useMemo(() => {
    if (isLoading) return null;
    if (reportType === 'team') {
      return {
        closed: Number(teamSalesData[0]?.TotalCompletedSales || 0),
        comisiones: Number(teamCommissionsData[0]?.ComisionTotal || 0),
        distribution: teamMembersData.reduce(
          (acc, m) => [
            acc[0] + (Number(m.Canceladas) || 0),
            acc[1] + (Number(m.Activas) || 0),
            acc[2] + (Number(m.VentasCerradas) || 0),
          ],
          [0, 0, 0]
        ),
      };
    }
    return null;
  }, [isLoading, reportType, teamSalesData, teamCommissionsData, teamMembersData]);

  const showNoSelection = reportType === 'individual' && !selectedUserId && !isLoading;

  if (loading || !profile) return <LoadingSpinner />;

  return (
    <main className="p-6 sm:pt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isAdmin ? 'Reports' : 'My Report'}
      </h1>

      {isAdmin && (
        <div className="mb-6 flex gap-4 flex-wrap">
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2"
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value as 'team' | 'individual');
              setSelectedUserId('');
            }}
          >
            <option value="team">Team Report</option>
            <option value="individual">Individual Report</option>
          </select>
          {reportType === 'individual' && (
            <select
              className="bg-white border border-gray-300 rounded-md px-4 py-2"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select User</option>
              {Array.isArray(teamMembersData) && teamMembersData.map((member) => (
                <option key={member.UsuarioID} value={member.IDEmail}>
                  {member.NombreCompleto}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trend</h2>
          <div className="h-96 md:h-[500px]">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading chart data...</p>
            ) : isAdmin ? (
              reportType === 'team' ? (
                <LinesChartTeam />
              ) : selectedUserId ? (
                <LinesChartIndividual email={selectedUserId} />
              ) : (
                <p className="text-center text-gray-500">Select a user to view data</p>
              )
            ) : (
              <LinesChartIndividual email={profile.email} />
            )}
          </div>
        </div>

        <div className="lg:col-span-1 h-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              {isAdmin ? (
                reportType === 'team' ? (
                  <BoxClosedTeam />
                ) : selectedUserId ? (
                  <BoxClosedIndividual email={selectedUserId} isAdmin/>
                ) : (
                  <p className="text-center text-gray-500">Select a user to view data</p>
                )
              ) : (
                <BoxClosedIndividual email={profile.email} />
              )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
              {isAdmin ? (
                reportType === 'team' ? (
                  <BoxComisionesTeam/>
                ) : selectedUserId ? (
                  <BoxComisionesIndividual email={selectedUserId} isAdmin/>
                ) : (
                  <p className="text-center text-gray-500">Select a user to view data</p>
                )
              ) : (
                <BoxComisionesIndividual email={profile.email} />
              )}
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isAdmin && reportType === 'team'
                ? 'Team Sales Distribution'
                : 'Individual Distribution'}
            </h2>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading chart...</p>
            ) : isAdmin ? (
              reportType === 'team' ? (
                <PieChartTeam distribution={currentData?.distribution} />
              ) : selectedUserId ? (
                <PieChartIndividual selectedUserEmail={selectedUserId} isAdmin/>
              ) : (
                <p className="text-center text-gray-500">Select a user to view data</p>
              )
            ) : (
              <PieChartIndividual selectedUserEmail={profile.email} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}