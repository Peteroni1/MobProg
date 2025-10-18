import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  memberSince: string;
  profileImage: string;
}

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const { width } = Dimensions.get('window');

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    occupation: 'Product Designer',
    memberSince: 'January 2024',
    profileImage: 'https://via.placeholder.com/200/CCCCCC/666666?text=No+Image',
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  const handleEditStart = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setEditedProfile(prev => ({
        ...prev,
        profileImage: result.assets[0].uri
      }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Card */}
        <View
          style={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Header Background */}
          <View
            style={{
              height: 160,
              backgroundColor: '#1a1a2e',
              justifyContent: 'flex-end',
              paddingBottom: 30,
              paddingHorizontal: 24,
            }}
          />

          {/* Content Section */}
          <View style={{ paddingHorizontal: 28, paddingBottom: 32 }}>
            {/* Profile Image - Overlapping */}
            <View
              style={{
                alignItems: 'center',
                marginTop: -90,
                marginBottom: 28,
              }}
            >
              <TouchableOpacity
                onPress={isEditing ? pickImage : undefined}
                activeOpacity={isEditing ? 0.7 : 1}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  borderWidth: 4,
                  borderColor: '#ffffff',
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <Image
                  source={{
                    uri: isEditing ? editedProfile.profileImage : profile.profileImage,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                {isEditing && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      paddingVertical: 8,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 7,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                      }}
                    >
                      CHANGE PHOTO
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Profile Info */}
            {isEditing ? (
              <View style={{ gap: 18, marginBottom: 28 }}>
                <TextInput
                  value={editedProfile.name}
                  onChangeText={(val) => handleInputChange('name', val)}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  style={{
                    fontSize: 28,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#1a1a2e',
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#e0e0e0',
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                  }}
                />
                <TextInput
                  value={editedProfile.occupation}
                  onChangeText={(val) => handleInputChange('occupation', val)}
                  placeholder="Job Title"
                  placeholderTextColor="#999"
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    textAlign: 'center',
                    color: '#666',
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#e0e0e0',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                  }}
                />
                <TextInput
                  value={editedProfile.email}
                  onChangeText={(val) => handleInputChange('email', val)}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: '#666',
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#e0e0e0',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                  }}
                />
                <TextInput
                  value={editedProfile.phone}
                  onChangeText={(val) => handleInputChange('phone', val)}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: '#666',
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#e0e0e0',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                  }}
                />
                <TextInput
                  value={editedProfile.location}
                  onChangeText={(val) => handleInputChange('location', val)}
                  placeholder="Location"
                  placeholderTextColor="#999"
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: '#666',
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#e0e0e0',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                  }}
                />
                <View style={{ paddingVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#999',
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      marginBottom: 4,
                    }}
                  >
                    MEMBER SINCE
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      textAlign: 'center',
                      color: '#999',
                    }}
                  >
                    {profile.memberSince}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ marginBottom: 28 }}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#1a1a2e',
                    marginBottom: 8,
                  }}
                >
                  {profile.name}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    textAlign: 'center',
                    color: '#5a5a7a',
                    marginBottom: 24,
                  }}
                >
                  {profile.occupation}
                </Text>

                {/* Divider */}
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#e8e8e8',
                    marginBottom: 24,
                  }}
                />

                {/* Info Grid */}
                <View style={{ gap: 18 }}>
                  <InfoItem icon="✉️" label="Email" value={profile.email} />
                  <InfoItem icon="📱" label="Phone" value={profile.phone} />
                  <InfoItem icon="📍" label="Location" value={profile.location} />
                  <InfoItem icon="📅" label="Member Since" value={profile.memberSince} />
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={{ gap: 12, marginTop: 8 }}>
              {isEditing ? (
                <View style={{ gap: 12 }}>
                  <TouchableOpacity
                    onPress={handleSave}
                    style={{
                      backgroundColor: '#1a1a2e',
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: 14,
                        textAlign: 'center',
                      }}
                    >
                      SAVE CHANGES
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleCancel}
                    style={{
                      backgroundColor: '#f5f5f5',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      borderWidth: 1.5,
                      borderColor: '#e0e0e0',
                    }}
                  >
                    <Text
                      style={{
                        color: '#666',
                        fontWeight: '600',
                        fontSize: 14,
                        textAlign: 'center',
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleEditStart}
                  style={{
                    backgroundColor: '#1a1a2e',
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: 15,
                      textAlign: 'center',
                      letterSpacing: 0.5,
                    }}
                  >
                    EDIT PROFILE
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 18, marginTop: 2 }}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: '700',
            color: '#999',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            lineHeight: 20,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;