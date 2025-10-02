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

interface BadCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  isUser?: boolean;
  memberSince?: string;
  points?: number;
  level?: string;
  isAdmin?: boolean;
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
  memberSince,
  points,
  level,
  isAdmin = false,
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
              {isUser && level && <Badge variant="secondary">{level}</Badge>}
            </div>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isUser && (
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
          </div>
        )}

        {isAdmin && (
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
                <span className="font-mono text-xs font-medium">
                  {employeeId}
                </span>
              </div>
            )}
            {permissions && permissions.length > 0 && (
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">
                  Permissions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {permissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant="outline"
                      className="text-xs"
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {isUser && onViewProfile && (
          <Button variant="default" onClick={onViewProfile} className="flex-1">
            View Profile
          </Button>
        )}
        {isUser && onMessage && (
          <Button variant="outline" onClick={onMessage} className="flex-1">
            Message
          </Button>
        )}

        {isAdmin && onEdit && (
          <Button variant="default" onClick={onEdit} size="sm">
            Edit
          </Button>
        )}
        {isAdmin && onPromote && (
          <Button variant="outline" onClick={onPromote} size="sm">
            Promote
          </Button>
        )}
        {isAdmin && onDelete && (
          <Button variant="destructive" onClick={onDelete} size="sm">
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
