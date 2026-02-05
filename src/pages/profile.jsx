import { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { get, post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { AuthContext } from "../components/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState({});
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fileInputRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await get(ENDPOINTS.GET_PROFILE, { authRequired: true });
      setProfile(res.data.profile);
      setDraft(res.data.profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    if (key === "image") setImgError(false);
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const formData = new FormData();

      ["name", "email", "phone"].forEach((key) => {
        if (draft[key] !== profile[key]) {
          formData.append(key, draft[key] || "");
        }
      });

      if (draft.image instanceof File) {
        formData.append("image", draft.image);
      }

      const res = await post(
        ENDPOINTS.UPDATE_PROFILE,
        formData,
        { authRequired: true }
      );

      setProfile(res.data.profile);
      setDraft(res.data.profile);
      setDirty(false);
    } catch (err) {
      console.error(err);
      showAlert("error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ✅ IMAGE URL — NO event, NO env, ONLY BASE_URL + profile/draft
  const imageUrl =
    draft.image instanceof File
      ? URL.createObjectURL(draft.image)
      : profile?.image
      ? `${BASE_URL}${profile.image}`
      : null;

  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        {loading && <ProfileSkeleton />}

        {!loading && profile && (
          <div className="bg-white rounded-2xl border shadow-sm">
            {/* HEADER */}
            <div className="p-6 flex items-center gap-4 border-b">
              <div
                className="w-16 h-16 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-indigo-600 text-white"
                onClick={() => fileInputRef.current.click()}
                title="Change profile photo"
              >
                {imageUrl && !imgError ? (
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-xl font-bold uppercase">
                    {profile.name?.charAt(0)}
                  </span>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  onChange("image", e.target.files?.[0])
                }
              />

              <div className="flex-1">
                <input
                  value={draft.name || ""}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="w-full text-xl font-semibold outline-none border-b border-transparent focus:border-indigo-500"
                  placeholder="Your name"
                />
                <input
                  value={draft.email || ""}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="w-full mt-1 text-sm text-slate-600 outline-none border-b border-transparent focus:border-indigo-500"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <ProfileRow
                label="Phone"
                value={draft.phone || ""}
                placeholder="Add phone number"
                onChange={(v) => onChange("phone", v)}
              />
            </div>

            {/* ACTIONS */}
            <div className="border-t p-6 flex justify-between items-center">
              {dirty ? (
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

/* ================= UI PARTS ================= */

const ProfileRow = ({ label, value, onChange, placeholder }) => (
  <div>
    <p className="text-xs text-slate-400 mb-1">{label}</p>
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm outline-none border-b border-slate-200 focus:border-indigo-500"
    />
  </div>
);

ProfileRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const ProfileSkeleton = () => (
  <div className="bg-white border rounded-xl p-6 animate-pulse">
    Loading…
  </div>
);

export default Profile;
