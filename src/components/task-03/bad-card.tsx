import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Represents user-specific data for the card component
 * @typedef {Object} UserSectionProps
 * @property {boolean} isUser - Flag indicating if this is a user card
 * @property {string} [memberSince] - Date user joined the platform
 * @property {number} [points] - User's loyalty points
 * @property {string} [level] - User's membership level
 * @property {() => void} [onViewProfile] - Handler for profile view action
 * @property {() => void} [onMessage] - Handler for messaging action
 */
type UserSectionProps = {
  isUser: boolean;
  memberSince?: string;
  points?: number;
  level?: string;
  onViewProfile?: () => void;
  onMessage?: () => void;
};

/**
 * User-specific section of the card
 * @component
 * @param {UserSectionProps} props - User-specific props
 * @returns {JSX.Element} Rendered user section or null
 */
function UserSection({
  isUser,
  memberSince,
  points,
  level,
  onViewProfile,
  onMessage,
}: UserSectionProps) {
  if (!isUser) return null;

  return (
    <div className="space-y-2">
      {memberSince && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Member Since:</span>
          <span className="font-medium">{memberSince}</span>
        </div>
      )}
      {points !== undefined && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Points:</span>
          <span className="font-medium">{points.toLocaleString()}</span>
        </div>
      )}
      {onViewProfile || onMessage ? (
        <div className="mt-4 flex gap-2">
          {onViewProfile && (
            <Button variant="default" onClick={onViewProfile} className="flex-1">
              View Profile
            </Button>
          )}
          {onMessage && (
            <Button variant="outline" onClick={onMessage} className="flex-1">
              Message
            </Button>
          )}
        </div>
      ) : null}
      {level && (
        <div className="mt-2">
          <Badge variant="secondary">{level}</Badge>
        </div>
      )}
    </div>
  );
}

/**
 * Represents admin-specific data for the card component
 * @typedef {Object} AdminSectionProps
 * @property {boolean} isAdmin - Flag indicating if this is an admin card
 * @property {string} [role] - Administrative role
 * @property {string} [department] - Department affiliation
 * @property {string} [employeeId] - Employee identification number
 * @property {string[]} [permissions] - List of administrative permissions
 * @property {() => void} [onEdit] - Handler for edit action
 * @property {() => void} [onPromote] - Handler for promote action
 * @property {() => void} [onDelete] - Handler for delete action
 */
type AdminSectionProps = {
  isAdmin: boolean;
  role?: string;
  department?: string;
  employeeId?: string;
  permissions?: string[];
  onEdit?: () => void;
  onPromote?: () => void;
  onDelete?: () => void;
};

/**
 * Admin-specific section of the card
 * @component
 * @param {AdminSectionProps} props - Admin-specific props
 * @returns {JSX.Element} Rendered admin section or null
 */
function AdminSection({
  isAdmin,
  role,
  department,
  employeeId,
  permissions,
  onEdit,
  onPromote,
  onDelete,
}: AdminSectionProps) {
  if (!isAdmin) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {role && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">{role}</span>
          </div>
        )}
        {department && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Department:</span>
            <span className="font-medium">{department}</span>
          </div>
        )}
        {employeeId && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Employee ID:</span>
            <span className="font-mono text-xs font-medium">{employeeId}</span>
          </div>
        )}
      </div>
      {permissions && permissions.length > 0 && (
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">
            Permissions:
          </span>
          <div className="flex flex-wrap gap-1">
            {permissions.map((permission) => (
              <Badge key={permission} variant="outline" className="text-xs">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {(onEdit || onPromote || onDelete) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <Button variant="default" onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
          {onPromote && (
            <Button variant="outline" onClick={onPromote} size="sm">
              Promote
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={onDelete} size="sm">
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

interface BadCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  isUser?: boolean;
  isAdmin?: boolean;
  memberSince?: string;
  points?: number;
  level?: string;
  role?: string;
  permissions?: string[];
  department?: string;
  employeeId?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onPromote?: () => void;
  onMessage?: () => void;
  onViewProfile?: () => void;
}

export function BadCard({
  name,
  email,
  avatarUrl,
  isUser = false,
  isAdmin = false,
  memberSince,
  points,
  level,
  role,
  permissions = [],
  department,
  employeeId,
  onEdit,
  onDelete,
  onPromote,
  onMessage,
  onViewProfile,
}: BadCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle>{name}</CardTitle>
              {isAdmin && <Badge variant="destructive">Admin</Badge>}
            </div>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <UserSection
          isUser={isUser}
          memberSince={memberSince}
          points={points}
          level={level}
          onViewProfile={onViewProfile}
          onMessage={onMessage}
        />
        <AdminSection
          isAdmin={isAdmin}
          role={role}
          department={department}
          employeeId={employeeId}
          permissions={permissions}
          onEdit={onEdit}
          onPromote={onPromote}
          onDelete={onDelete}
        />
      </CardContent>

      <CardFooter className="pt-0">
        {!isUser && !isAdmin && (
          <div className="text-sm text-muted-foreground">
            Standard user card
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
