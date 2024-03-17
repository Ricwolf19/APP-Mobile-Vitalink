import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useAccountData } from '../../context/authContext';
import React, { useState } from 'react';
import Spinner from '@/components/spinner';
import {
  Card,
  CardContent,
  CardSubtitle,
  CardText,
  CardTitle,
} from '@/components/card';
import tailwind from 'twrnc';
import { faBedPulse, faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Doctors = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { accountData, reload } = useAccountData();

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {accountData ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {accountData.doctors.map((doctor: any) => (
            <TouchableOpacity key={doctor.id}>
              <Card style={tailwind`w-auto m-3 mb-0 mt-3 bg-white`}>
                <CardContent style={tailwind`gap-1`}>
                  <CardTitle style={{ color: '#1565c0' }}>
                    <FontAwesomeIcon icon={faHospital} color="#1565c0" />
                    {'  '}
                    {doctor.name} {doctor.lastName}
                  </CardTitle>
                  <CardSubtitle>
                    ID number: {doctor.numCedula}
                  </CardSubtitle>
                  <CardText>Area: {doctor.area}</CardText>
                  <CardSubtitle>Patients: </CardSubtitle>
                  <CardText>
                    {doctor.patients.map((patient: any, i: number, patientsArray: number) => (
                      <Text key={i}>{'• ' + patient + ((patientsArray[i + 1])?'\n' :'')}</Text>
                    ))}
                  </CardText>
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Doctors;
