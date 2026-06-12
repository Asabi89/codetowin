export const PROFILE_VISIBILITY = {
  PUBLIC: "public",
  MEMBERS: "members",
  PRIVATE: "private",
};

export const getProfileVisibility = (profile) => (
  profile?.visibility || (profile?.isPublic === false ? PROFILE_VISIBILITY.PRIVATE : PROFILE_VISIBILITY.PUBLIC)
);

export const isProfileDiscoverable = (profile) => (
  getProfileVisibility(profile) !== PROFILE_VISIBILITY.PRIVATE
);

export const canViewFullProfile = (profile, viewer = {}) => {
  const visibility = getProfileVisibility(profile);

  if (visibility === PROFILE_VISIBILITY.PUBLIC) {
    return true;
  }

  if (viewer.isOwner) {
    return true;
  }

  if (visibility === PROFILE_VISIBILITY.MEMBERS) {
    return Boolean(viewer.registered || viewer.embedded || viewer.sameHackathon || viewer.sameTeam);
  }

  return Boolean(viewer.sameHackathon || viewer.sameTeam || viewer.ownsHackathon);
};

export const canViewSensitiveProfileInfo = (profile, viewer = {}) => (
  canViewFullProfile(profile, viewer) &&
  (
    getProfileVisibility(profile) === PROFILE_VISIBILITY.PUBLIC ||
    viewer.isOwner ||
    viewer.embedded ||
    viewer.role === "organizer" ||
    viewer.role === "mentor"
  )
);

export const getVisibilityLabel = (profile) => {
  const visibility = getProfileVisibility(profile);

  if (visibility === PROFILE_VISIBILITY.MEMBERS) {
    return "Membres connectés";
  }

  if (visibility === PROFILE_VISIBILITY.PRIVATE) {
    return "Privé";
  }

  return "Public";
};
