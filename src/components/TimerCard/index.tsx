import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../util/constants';
import {
  formattedTimeDifference,
  normalize,
  useInterval,
} from '../../util/helper';
import {Timer} from '../../util/types';
import style from './style';

export type TimerCardProps = {
  height: number;
  width: number;
  timer: Timer;
  onStart: (timerId: string) => void;
  onStop: (timerId: string) => void;
  deleteTimer: (timerId: string) => void;
};

type CountDownProps = {
  running: boolean;
  startFrom: number;
  seconds: number;
};

export const useCountdown = ({running, startFrom, seconds}: CountDownProps) => {
  const [countdown, setCountdown] = React.useState(0);

  useInterval(
    {ms: 333},
    () => {
      setCountdown(
        running
          ? Math.max(0, seconds - Math.floor((Date.now() - startFrom) / 1000))
          : seconds,
      );
    },
    [running, seconds, startFrom],
  );

  return countdown;
};

const TimerCard: React.FC<TimerCardProps> = React.memo(props => {
  const styles = style(props.height, props.width);

  const countdown = useCountdown({
    running: props.timer.running,
    startFrom: props.timer.startFrom,
    seconds: props.timer.seconds,
  });
  if (countdown === 0) {
    props.onStop(props.timer.id);
  }
  const time = useMemo(() => formattedTimeDifference(countdown), [countdown]);
  return (
    <View style={styles.timerparentContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerStyle}>{time}</Text>
      </View>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            props.timer.running
              ? props.onStop(props.timer.id)
              : props.onStart(props.timer.id)
          }>
          <FontAwesome
            name={props.timer.running ? 'pause' : 'play'}
            size={normalize(16)}
            color={colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteTimer(props.timer.id)}>
          <Ionicons
            name="ios-trash-outline"
            color={colors.black}
            size={normalize(16)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TimerCard;
