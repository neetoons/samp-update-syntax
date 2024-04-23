stock MoverVehiclePos(vehicleid, Float:x, Float:y, Float:z)
{
    if (SetVehiclePos(vehicleid, x, y, z))
    {
        uwuVehPos[vehicleid][vp_x] = x;
        uwuVehPos[vehicleid][vp_y] = y;
        uwuVehPos[vehicleid][vp_z] = z;
        foreach(Player, i) if (GetPlayerVehicleID(i) == vehicleid)
        {
            CurrentPos[i][0] = x;
            CurrentPos[i][1] = y;
            CurrentPos[i][2] = z;
            pSetPos[i][0] = x;
            pSetPos[i][1] = y;
            pSetPos[i][2] = z;
            SetSyncTime(i, SYNC_TYPE_POS);
            WarningTPlayer[i] = 0;
        }
        return 1;
    }
    return 0;
}