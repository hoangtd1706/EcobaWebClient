import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import {
  DownloadButton,
} from '@nvdunginest/emis-mui';

import {
  AppDispatch,
  alertActions,
  alertMessage,
  loadingActions,
} from '../../../core';

import efmService from '../services/efm';
import efm03Service, { SummaryReport } from '../services/efm03';
import { ReportItem } from '../services/types';

import dataProvider from '../common/efm02Helpers';

import DetailChart from '../components/efm02/DetailChart';
import OverviewChart from '../components/efm02/OverviewChart';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    height: 'calc(100% - 32px)',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(-1),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height: 'calc(100% - 48px)',
    },
  },
  menu: {
    display: 'flex',
    width: '100%',
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Efm02(): JSX.Element {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [report, setReport] = React.useState<ReportItem[]>([]);
  const [efm03Report, setEfm03Report] = React.useState<SummaryReport>({
    data: [],
    projects: [],
  });

  const refresh = async () => {
    dispatch(loadingActions.show());
    try {
      const data = await Promise.all([efmService.getEfm02Report(), efm03Service.get()]);
      setReport(data[0]);
      setEfm03Report(data[1]);
    }
    catch {
      dispatch(alertActions.show(alertMessage.FETCH_FAILURE, 'error'));
    }
    finally {
      dispatch(loadingActions.hide());
    }
  }

  React.useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.content}>
      <Grid container spacing={1} style={{ padding: '8px' }}>
        <Grid container alignItems="center" item spacing={1} className={classes.menu}>
          <Grid item className={classes.title}>
            <Typography variant="h6">B??o c??o Chi ph?? t??i ch??nh r??ng C??ng ty</Typography>
          </Grid>
          <Grid item>
            <DownloadButton
              filename="Efm02.xlsx"
              url="/api/ebi/efm/get-excel?report=efm02"
              label="T???i b??o c??o"
            />
          </Grid>
        </Grid>
        {report.length > 0 && (
          <>
            <Grid item xs={12}>
              <OverviewChart
                title="T??? l??? CPTC r??ng tr??n doanh thu"
                data={dataProvider.getOverviewChartData("FORECAST", report, efm03Report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Chi ph?? t??i ch??nh KHB??"
                data={dataProvider.getDetailChartData("BASELINE", true, report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Thu nh???p t??i ch??nh KHB??"
                data={dataProvider.getDetailChartData("BASELINE", false, report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Chi ph?? t??i ch??nh k??? ho???ch"
                data={dataProvider.getDetailChartData("REBASELINE", true, report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Thu nh???p t??i ch??nh k??? ho???ch"
                data={dataProvider.getDetailChartData("REBASELINE", false, report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Chi ph?? t??i ch??nh th???c t???/d??? b??o"
                data={dataProvider.getDetailChartData("FORECAST", true, report)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailChart
                title="Thu nh???p t??i ch??nh th???c t???/d??? b??o"
                data={dataProvider.getDetailChartData("FORECAST", false, report)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  )
}