import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, Grid, Select, MenuItem } from '@mui/material';
import { 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  ReferenceLine,
  AreaChart
} from 'recharts';

const burndownData = [
  { day: 'Day 1', ideal: 50, actual: 50 },
  { day: 'Day 2', ideal: 45, actual: 48 },
  { day: 'Day 3', ideal: 40, actual: 42 },
  { day: 'Day 4', ideal: 35, actual: 38 },
  { day: 'Day 5', ideal: 30, actual: 25 },
  { day: 'Day 6', ideal: 25, actual: 22 },
  { day: 'Day 7', ideal: 20, actual: 20 },
  { day: 'Day 8', ideal: 15, actual: 12 },
  { day: 'Day 9', ideal: 10, actual: 8 },
  { day: 'Day 10', ideal: 5, actual: 4 },
  { day: 'Day 11', ideal: 0, actual: 0 },
];

const velocityData = [
  { sprint: 'Sprint 1', committed: 40, completed: 35 },
  { sprint: 'Sprint 2', committed: 45, completed: 42 },
  { sprint: 'Sprint 3', committed: 42, completed: 45 },
  { sprint: 'Sprint 4', committed: 50, completed: 48 },
];

export const ReportsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Reports</Typography>
        <Select size="small" defaultValue="s2" sx={{ width: 160, height: 32, fontSize: 13 }}>
          <MenuItem value="s1">Sprint 1</MenuItem>
          <MenuItem value="s2">Sprint 2 (Active)</MenuItem>
        </Select>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Burndown Chart" sx={{ fontSize: 13 }} />
          <Tab label="Velocity" sx={{ fontSize: 13 }} />
          <Tab label="Sprint Report" sx={{ fontSize: 13 }} />
          <Tab label="Cumulative Flow" sx={{ fontSize: 13 }} />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {tabValue === 0 && (
          <Box>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 700 }}>Burndown Chart</Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <ResponsiveContainer>
                  <ComposedChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                    <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Story Points', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 4px 12px rgba(9,30,66,0.15)' }}
                    />
                    <Area type="monotone" dataKey="actual" fill="#0052CC" fillOpacity={0.05} stroke="none" />
                    <Line type="monotone" dataKey="ideal" stroke="#DFE1E6" strokeDasharray="5 5" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" stroke="#0052CC" strokeWidth={2} dot={{ r: 4, fill: '#0052CC' }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Card>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>42</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Completed Points</Typography>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: 'warning.main', fontWeight: 700 }}>8</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Remaining Points</Typography>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: 'info.main', fontWeight: 700 }}>5</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Added after start</Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 700 }}>Velocity Chart</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                  <XAxis dataKey="sprint" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 4px 12px rgba(9,30,66,0.15)' }} />
                  <Bar dataKey="committed" fill="#4C9AFF" radius={[2, 2, 0, 0]} barSize={40} />
                  <Bar dataKey="completed" fill="#0052CC" radius={[2, 2, 0, 0]} barSize={40} />
                  <ReferenceLine y={42} stroke="#DE350B" strokeDasharray="3 3" label={{ position: 'right', value: 'Avg: 42', fill: '#DE350B', fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};
