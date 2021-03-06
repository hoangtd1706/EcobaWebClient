import React from "react";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Typography,
} from '@material-ui/core';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import format from '../../../../configs/format';
import { chartColorPalettes } from '../../constants/colors';
import { renderSplitLine } from '../common';

export type DetailChartData = {
  period: string;
  paymentDiscount: number;
  financialSupport: number;
  latePayment: number;
  shortTermFunding: number;
  longTermFunding: number;
  other: number;
}

type DetailChartProps = {
  title: string;
  data: DetailChartData[];
}

export default function DetailChart({
  title,
  data,
}: DetailChartProps): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [
    paymentDiscountColor,
    financialSupportColor,
    latePaymentColor,
    shortTermFundingColor,
    longTermFundingColor,
    otherColor,
  ] = chartColorPalettes;

  const barSize = 15;

  const tickFormatter = (value: number) => format.formatMoney(value / 1000000);
  const tooltipFormatter = (value: number) => `${format.formatMoney(value / 1000000)} tr VND`;

  return (
    <div style={{ width: '100%' }}>
      <Typography align="center" variant="h6">{title}</Typography>
      <div style={{ width: '100%', height: 280, padding: '8px' }}>
        <ResponsiveContainer>
          <ComposedChart
            barCategoryGap={5}
            barGap={0}
            data={data}
            margin={{
              top: 0, right: 0, bottom: 0, left: 0,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="period" type="category" scale="band" />
            <YAxis
              type="number"
              mirror={matches}
              yAxisId={1}
              tickFormatter={tickFormatter}
            />
            <YAxis
              type="number"
              mirror={matches}
              yAxisId={0}
              orientation="right"
              tickFormatter={tickFormatter}
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Bar
              isAnimationActive={false}
              name="Chi???t kh???u thanh to??n"
              dataKey="paymentDiscount"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={paymentDiscountColor}
            />
            <Bar
              isAnimationActive={false}
              name="CT H??? tr??? t??i ch??nh"
              dataKey="financialSupport"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={financialSupportColor}
            />
            <Bar
              isAnimationActive={false}
              name="Ch???m thanh to??n"
              dataKey="latePayment"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={latePaymentColor}
            />
            <Bar
              isAnimationActive={false}
              name="TT v???n ng???n h???n"
              dataKey="shortTermFunding"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={shortTermFundingColor}
            />
            <Bar
              isAnimationActive={false}
              name="TT v???n d??i h???n"
              dataKey="longTermFunding"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={longTermFundingColor}
            />
            <Bar
              isAnimationActive={false}
              name="Ho???t ?????ng kh??c"
              dataKey="other"
              stackId="stackedColumnEfm02"
              barSize={barSize}
              fill={otherColor}
            />
            {renderSplitLine()}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}