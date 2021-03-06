export type Efm06BarChartData = {
  name: string;
  total: number;
  balance: number;
  remaining: number;
}

export type Efm06PieChartData = {
  name: string;
  value: number;
}

export type Efm06SCurveChartData = {
  period: string;
  deposit: number | null;
  credit: number | null;
  balance: number | null;
}

import { BankReport } from '../services/efm';
import { ReportItem } from '../services/types';
import {
  getCurrentPeriod,
  getFiscalYear,
  getPeriodLabel,
  getPeriodsByFiscalYear,
} from './helpers';

const getSCurveChartData = (
  report: BankReport[],
): Efm06SCurveChartData[] => {

  const fiscalYear = getFiscalYear();
  const periods = getPeriodsByFiscalYear(fiscalYear);
  // const currentPeriod = getCurrentPeriod();
  const data: ReportItem[] = [];
  report.map(b => {
    data.push(...b.data);
    return true;
  });

  const currentPeriod = getCurrentPeriod();

  return periods.map(period => {
    const periodData = data.filter(x => x.period === period);
    const depositData = periodData.filter(x =>
      x.reportType === '501' ||
      x.reportType === '502' ||
      x.reportType === '503' ||
      x.reportType === '504' ||
      x.reportType === '505' ||
      x.reportType === '506'
    );

    const creditData = periodData.filter(x =>
      x.reportType === '301' ||
      x.reportType === '302' ||
      x.reportType === '305'
    );

    const depositVal = depositData.map(x => x.accumulation).reduce((acc, val) => acc + val, 0);
    const creditVal = creditData.map(x => x.accumulation).reduce((acc, val) => acc + val, 0);


    const row: Efm06SCurveChartData = {
      period: getPeriodLabel(period),
      deposit: currentPeriod >= period ? depositVal : null,
      credit: currentPeriod >= period ? creditVal : null,
      balance: currentPeriod >= period ? creditVal - depositVal : null,
    }

    return row;
  });
}

const getPieChartData = (
  report: BankReport[],
): Efm06PieChartData[] => {

  const currentPeriod = getCurrentPeriod();
  const data: ReportItem[] = [];
  report.map(b => {
    data.push(...b.data);
    return true;
  });

  const result: Efm06PieChartData[] = [];
  result.push(getPieChartRow(data, currentPeriod, '01', 'Ti???n g???i thanh to??n'));
  result.push(getPieChartRow(data, currentPeriod, '02', 'Ti???n g???i c?? k??? h???n t??? 1-3 th??ng'));
  result.push(getPieChartRow(data, currentPeriod, '03', 'Ti???n g???i c?? k??? h???n t??? 3-6 th??ng'));
  result.push(getPieChartRow(data, currentPeriod, '04', 'Ti???n g???i c?? k??? h???n t??? 6-12 th??ng'));
  result.push(getPieChartRow(data, currentPeriod, '05', 'Ti???n g???i c?? k??? h???n tr??n 12 th??ng'));
  result.push(getPieChartRow(data, currentPeriod, '06', 'K?? qu??? b???ng ti???n'));

  return result;
}

const getBarChartData = (
  report: BankReport[],
): Efm06BarChartData[] => {

  const currentPeriod = getCurrentPeriod();
  const data: ReportItem[] = [];
  report.map(b => {
    data.push(...b.data);
    return true;
  });

  const result: Efm06BarChartData[] = [];
  result.push(getBarChartRow(data, currentPeriod, '01', 'Vay ng???n h???n'));
  result.push(getBarChartRow(data, currentPeriod, '02', 'Vay d??i h???n'));
  result.push(getBarChartRow(data, currentPeriod, '03', 'B???o l??nh'));
  result.push(getBarChartRow(data, currentPeriod, '04', 'L/C'));
  result.push(getBarChartRow(data, currentPeriod, '05', 'Vay th???u chi'));

  return result;

}

const getBarChartRow = (
  data: ReportItem[],
  period: number,
  dataType: string,
  category: string,
): Efm06BarChartData => {
  const totalData = data.filter(x => x.period === period && x.reportType === `2${dataType}`);
  const balanceData = data.filter(x => x.period === period && x.reportType === `3${dataType}`);
  const totalVal = totalData.map(x => x.accumulation).reduce((acc, val) => acc + val, 0);
  const balanceVal = balanceData.map(x => x.accumulation).reduce((acc, val) => acc + val, 0);

  const item: Efm06BarChartData = {
    name: category,
    total: totalVal,
    balance: balanceVal,
    remaining: totalVal - balanceVal,
  }

  return item;
}

const getPieChartRow = (
  data: ReportItem[],
  period: number,
  dataType: string,
  category: string,
): Efm06PieChartData => {
  const totalData = data.filter(x => x.period === period && x.reportType === `5${dataType}`);
  const totalVal = totalData.map(x => x.accumulation).reduce((acc, val) => acc + val, 0);

  const item: Efm06PieChartData = {
    name: category,
    value: totalVal,
  }

  return item;
}

const helpers = {
  getSCurveChartData,
  getPieChartData,
  getBarChartData,
}

export default helpers;